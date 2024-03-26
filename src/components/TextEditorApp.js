import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import ImageResize from "quill-image-resize";
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { database } from '../firebase';
import { ref, set, get, child } from "firebase/database";
import "./TextEditorApp.css"
import styled from '@emotion/styled';

Quill.register("modules/imageResize", ImageResize);

const TOOLBAR_COMMANDS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ script: "sub" }, { script: "super" }],
	["bold", "italic", "underline"],
	[{ list: "ordered" }, { list: "bullet" }],
	[{ color: [] }, { background: [] }],
	[{ align: [] }],
	[{ image: "resize" }, "blockquote", "code-block"],
	["clean"],
];


function sendQuillDataToFirebase(quill, delta, documentId) {
	if (quill)
	{
		// Update Firebase Realtime Database
		set(ref(database, `documents/${documentId}`), { quillData: quill.getContents().ops });
	}
}

const getDocumentFromFirebase = (docPath) =>
	get(child(ref(database),`${docPath}`)).then((snapshot) => {
		if (snapshot.exists() && typeof(snapshot.val().quillData) !== 'undefined') {
			return Object.values(snapshot.val().quillData); //convert object into array of values, as quill expects
		} else {
			console.log("No data available");
			return null;
		}
	}).catch((error) => {
		console.error(error);
		return null;
	});


export default function TextEditor() {
	const {id: documentId} = useParams();
	const [socket, setSocket] = useState();
	const [quill, setQuill] = useState();
	console.log(documentId)

	useEffect(() => {
		const s = io("http://localhost:3001")
		setSocket(s)

		return () => {
			s.disconnect()
		}
	}, [])


  	useEffect(() => {
    if (socket == null || quill == null) return 

    
    socket.once("load-document", () => {
		console.log("Loading document...");
		getDocumentFromFirebase(`documents/${documentId}`).then(document => {
			quill.setContents(document);
			quill.enable();
			console.log(document);
		}).catch(error => {
			console.error("Error loading document:", error);
		});
    })

	socket.emit("get-document", documentId)
	}, [socket, quill, documentId])

  	useEffect(() => {
		const handler = (delta) => {
			quill.updateContents(delta)
		}
		if (socket == null || quill == null) return 
		socket.on('receive-changes', (handler))

		return () => {
		quill.off('receive-changes', handler)
		}
	}, [socket, quill]) 

	useEffect(() => {
		if (socket == null || quill == null) return 

		const handler = (delta, oldDelta, source) => {
		if (source !== 'user') return 
			sendQuillDataToFirebase(quill, delta, documentId);
			socket.emit("send-changes", delta)
		}

		quill.on('text-change', handler)

		return () => {
			quill.off('text-change', handler)
		}
	}, [socket, quill, documentId])

	const stop_many_toolbars = useCallback((wrapper) => {
		if (wrapper == null) return;
		wrapper.innerHTML = "";
		const editor = document.createElement("div");
		wrapper.append(editor);
		const q = new Quill(editor, {
			theme: "snow",
			modules: {
				toolbar: TOOLBAR_COMMANDS,
				imageResize: {
					displaySize: true,
					handleStyles: {
						backgroundColor: "black",
						border: "none",
						color: "white",
					},
				},
			},
		});
		q.disable();
		q.setText("Loading...");
		setQuill(q);
	}, []);
  
    return (
		<>

		<Link className={"help"} to={`/documents/${documentId}/draw`}><button>Drawing Page</button></Link>
		<div className="paper" ref={stop_many_toolbars}></div>

		</>
    )
}
