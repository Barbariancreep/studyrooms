import styled from "@emotion/styled"
import React, { useRef, useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, onSnapshot, updateDoc, ref, database, onChildAdded } from 'firebase/firestore';
import { db } from '../firebase';
const ConferenceCall = styled.div`
    border-style: solid;
    border-width: 5px;
    width: 50vh;
    height: 100vh;
    box-sizing: border-box;
    margin-left: auto;
    display: flex;
    flex-direction: column;
`
const Videos = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    height: max-content;
`

const Controls = styled.div`
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: 5px;
    padding-bottom: 10px;
    margin-top: auto;
`
const H1 = styled.div`
    text-align: center;
    border-style: none none solid none;
    border-width: 1px;
    padding-bottom: 20px;
    padding-top: 20px;
    margin: 0%;
`
const P = styled.div`
    display: inline;
    font-size: 20px;
    padding-right: 20px;
    padding-left:  5px;
`

const ButtonRows = styled.div`
    display: flex;
    align-items: center;
`

function VideoChat() {
    const servers = {
        iceServers: [
          {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
          },
        ],
        iceCandidatePoolSize: 10,
      };
    const [pc, setPc] = useState(new RTCPeerConnection(servers));
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const webcamVideoRef = useRef();
    const remoteVideoRef = useRef();
    const callInputRef = useRef();
  
    const webcamButton = useRef();
    const callButton = useRef();
    const answerButton = useRef();
    const hangupButton = useRef();
    const muteButton = useRef();
    const chatButton = useRef();

    useEffect(() => {
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                setRemoteStream(prevStream => {
                    const newStream = prevStream ? prevStream.clone() : new MediaStream();
                    newStream.addTrack(track);
                    console.log("new stream added");
                    return newStream;
                });
            });
        };
    }, [pc]);

    useEffect(() => {
        if (localStream) {
            webcamVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);
    
    useEffect(() => {
        if (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const setupWebcam = async () => {
    alert("You are starting your webcam");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    setRemoteStream(new MediaStream());

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    webcamVideoRef.current.srcObject = stream;
    remoteVideoRef.current.srcObject = remoteStream;
  };

  const createCall = async () => {
    alert("You are creating a conference room, share the code with other users you want in the room");

    const callsCollection = collection(db, 'calls');
    const callsDocRef = doc(callsCollection);

    const offerCandidates = collection(callsDocRef, 'offerCandidates');
    const answerCandidates = collection(callsDocRef, 'answerCandidates');

    callInputRef.current.value = callsDocRef.id;

    pc.onicecandidate = event => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callsDocRef, { offer });

    onSnapshot(callsDocRef, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const joinCall = async () => {
    alert("You are joining a call");
    const callId = callInputRef.current.value;
    const callDoc = doc(collection(db, 'calls'), callId);
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    pc.onicecandidate = event => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
          console.log("connection made!");
        }
      });
    });


  };

  const hangupCall = async () => {
    alert("You are leaving this call");
    if (pc) {
      pc.close();
      setPc(null);
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(null);
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
      });
      setRemoteStream(null);
    }
  };

  const handleWebcamButtonClick = () =>{
    setupWebcam();
  }

  const handleCallButtonClick = () =>{
    createCall();
  }

  const handleAnswerButtonClick = () =>{
    joinCall();
  }

  const handleHangupButtonClick = () =>{
    hangupCall();
  }

  const handleMute = () => {
    const isMuted = localStream.getAudioTracks()[0].enabled;
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !isMuted;
    });
  };

  return (
    <>
    <ConferenceCall>
        <H1>
            Conference Room
        </H1>
        <Videos>
            <span>
                <video ref={webcamVideoRef} autoPlay playsInline></video>
            </span>
            <span>
                <video ref={remoteVideoRef} autoPlay playsInline ></video>
            </span>
        </Videos>

        <hr className="separator"></hr>

        <Controls>
            <ButtonRows>
                <button ref={webcamButton} onClick={handleWebcamButtonClick}>Start webcam</button> <button ref={callButton} onClick={handleCallButtonClick}>Create Room</button>
            </ButtonRows>
            <ButtonRows>
                <P>Enter the room code here:</P><input ref={callInputRef} defaultValue={""}/>
            </ButtonRows>
            <ButtonRows>
                <button ref={answerButton} onClick={handleAnswerButtonClick}>Join</button>
                <button ref={hangupButton} onClick={handleHangupButtonClick}>Leave</button>
            </ButtonRows>
            <ButtonRows>
                <button ref ={chatButton}>Submit</button>
                <button ref={muteButton} onClick={handleMute}>Mute</button>
            </ButtonRows>
        </Controls>

    </ConferenceCall>
    </>
  );
}

export default VideoChat;