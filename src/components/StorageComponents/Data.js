// allows us to style our components here in JS
import styled from '@emotion/styled';

// Icons from MUI
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

// ball
import { useEffect, useState } from 'react';
import { db, storage, auth } from '../../firebase';
import { getDocs, query, where, collection, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";


const DataContainer = styled.div`
    position :absolute;
    top: 9%;
    left: 10%;
    width: 62%;
    flex: 1 1;
    padding: 0px 0px 0px 20px;
    background:rgb(248, 248, 248) ;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`
const DataType = styled.div`
    font-weight:650;
    margin-left:0.5%;
    font-size:17px;
`
const DataListHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    padding: 10px;
    p {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
`

const DataListRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    div {
        display: contents;
    }
    
    p {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
        padding-left: 10px;
        height:40px;
    }
    &:hover{
        background: rgb(240, 240, 240);
        cursor: pointer;
    }
`

const ShareFilePopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
    input.modal__textbox{
        background:grey;
        display:flex;
    }
`

const Data = ({ username }) => {
    const userCollectionRef = collection(db, username);
    const [files, setFiles] = useState([]);
    const [fileToShare, setFileToShare] = useState(null);
    const [sharedUsername, setSharedUsername] = useState('');

    const handleSharedUsernameChange = e => {
        if(e.target.value) {
            setSharedUsername(e.target.value)
        }
    }

    useEffect(() => {
        const querySnapshot = getDocs(userCollectionRef); // conditionless query that returns all documents in collection
        querySnapshot.then((snapshot) => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))  
        });
    }, [])

    function secondsToDate(seconds) { // Covert seconds passed since Unix epoch 1970-01-01T00:00:00Z into HH:MM DD/MM/YYYY string
        const date = new Date(seconds * 1000); // Convert seconds to milliseconds
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are zero-based
        const year = date.getFullYear();

        return `${hours}:${minutes}  ${day}/${month}/${year}`;
    }
    
    function openFile(file) {
        if (file.data.filename.endsWith(".study")) {
            window.location.href = `/documents/${file.id}`;
        } else {
            window.open(file.data.fileURL, '_blank').focus()
        }
    }

    async function deleteFile(fileToDelete) { // delete doc
        await deleteDoc(doc(db, username, fileToDelete.id)); 
        
        if (!fileToDelete.data.filename.endsWith(".study")) {
            var fileRef = ref(storage, `${username}/${fileToDelete.data.filename}`);
            deleteObject(fileRef); // delete file
        }

        //remove html element
        const updatedFiles = files.filter(file => file.id !== fileToDelete.id);
        setFiles(updatedFiles);
    }

    async function shareFile(e) {
        e.preventDefault();

        try {
            const docData = {
                timestamp: fileToShare.data.timestamp,
                filename: fileToShare.data.filename,
                owner: fileToShare.data.owner,
                fileURL: fileToShare.data.fileURL,
                filesize: fileToShare.data.filesize
            };
            await setDoc(doc(db, sharedUsername, fileToShare.id), docData);
            setSharedUsername('');
            setFileToShare(null);
        } catch (error) {
            console.error("Error adding Firestore document:", error);
        }
    }

    return (
        <>
        <Modal
            open={(fileToShare !== null)} //
            onClose={() => setFileToShare(null)}
            >
            <ShareFilePopup>  
                <form onSubmit={shareFile}>
                    <p>Enter the username of the user you want to share with:</p>
                    <input type="text" className='modal__textbox' value={sharedUsername} onChange={handleSharedUsernameChange}/>
                    <input type="submit" className='modal__submit' value="Confirm"/>
                </form>
            </ShareFilePopup>
        </Modal>

        <DataContainer>
            <DataType>
                <span>My Files</span>
            </DataType>
            <DataListHeader>
                <p><b>Name <ArrowDownwardIcon /></b></p>
                <p><b>Owner</b></p>
                <p><b>Last Modified</b></p>
                <p><b>File Size</b></p>
            </DataListHeader>
            
            {files.map(file => (
                <DataListRow key={file.id}>
                    <div onClick={() => openFile(file)}>
                        <p>{file.data.filename}</p>
                        <p>{file.data.owner}</p>
                        <p>{secondsToDate(file.data.timestamp.seconds)}</p>
                        <p>{file.data.filesize} B</p>
                    </div>
                    <div onClick={() => setFileToShare(file)}><IosShareIcon/></div>
                    <div onClick={() => deleteFile(file)}><DeleteOutlineIcon/></div>
                </DataListRow>
            ))}

        </DataContainer>
        </>
    )
}

export default Data