import styled from '@emotion/styled';

// Icons
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditNoteIcon from '@mui/icons-material/EditNote';

// Modal stuff
import Modal from '@mui/material/Modal';
import { useState } from 'react';

// File storage stuff
import { db, storage } from '../../firebase';
import { doc, setDoc, Timestamp, collection, addDoc } from "firebase/firestore"; 
import { getDownloadURL, getMetadata, ref, uploadBytes } from "firebase/storage";

const SidebarContainer = styled.div`
    margin-top: 10px;
`

const SidebarOptionsList = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color:#333;
        font-size: 13px;
    }
`

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
    svg.MuiSvgIcon-root {
        color:#00d7ff;
    }
    span {
        margin-left: 15px;
        font-size: 13px;
        font-weight: 500;
        color:#000000;
    }
`

const AddFilePopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`

const Sidebar = () => {
    const userId = "admin";

    const [openCreate, setOpenCreate] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [newFileName, setNewFileName] = useState('');

    const handleFile = e => {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleNewFileNameChange = e => {
        if(e.target.value) {
            setNewFileName(e.target.value)
        }
    }

    // function to upload from file
    async function uploadFile (e) {
        e.preventDefault();
        setUploading(true);

        // Add file to firestore storage
        const storageRef = ref(storage, `${userId}/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
        
        // Add firestore entry
        const collectionRef = collection(db, userId);
        try {
            const downloadURL = await getDownloadURL(storageRef);
            const metadata = await getMetadata(storageRef);
            const docData = {
                timestamp: Timestamp.now(),
                filename: file.name,
                fileURL: downloadURL,
                filesize: metadata.size
            };
            await addDoc(collectionRef, docData);
        } catch (error) {
            console.error("Error adding Firestore document:", error);
        }

        setUploading(false);
        setFile(null);
        setOpenUpload(false);

        //Page to update firestore data list in Data.js
        window.location.reload();
    }

    async function createNewFile(e) {
        e.preventDefault();

        if (!newFileName.toLowerCase().endsWith(".study")) { 
            newFileName += ".study"; // add file extension if user hasn't already
        }

        const collectionRef = collection(db, userId);
        try {
            const docData = {
                timestamp: Timestamp.now(),
                filename: newFileName,
                fileURL: null,
                filesize: 0
            };
            await addDoc(collectionRef, docData);
        } catch (error) {
            console.error("Error adding Firestore document:", error);
        }

        setNewFileName('');
        //Page to update firestore data list in Data.js
        window.location.reload();
    }

    return (
        <>
        <Modal
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            >
            <AddFilePopup>  
                <form onSubmit={createNewFile}>
                    <p>New file name:</p>
                    <input type="text" className='modal__textbox' value={newFileName} onChange={handleNewFileNameChange}/>
                    <input type="submit" className='modal__submit' value="Confirm"/>
                </form>
            </AddFilePopup>
        </Modal>

        <Modal
            open={openUpload}
            onClose={() => setOpenUpload(false)}
            >
            <AddFilePopup>
                <form onSubmit={uploadFile}>
                    {uploading ? <span>Uploading...</span> : (
                        <>
                            <input type="file" className='modal__file' onChange={handleFile} />
                            <input type="submit" className='modal__submit' value="Confirm"/>
                        </>
                    )}
                </form>
            </AddFilePopup>
        </Modal>

        <SidebarContainer>
            <SidebarOptionsList>
                <SidebarOption onClick={() => setOpenCreate(true)}>
                    <EditNoteIcon/>
                    <span>Create New File</span>
                </SidebarOption>
                <SidebarOption onClick={() => setOpenUpload(true)}>
                    <UploadFileIcon/>
                    <span>Upload New File</span>
                </SidebarOption>
            </SidebarOptionsList>
            <hr />
            <SidebarOptionsList>
                <SidebarOption>
                    <FolderCopyIcon />
                    <span>My Files</span>
                </SidebarOption>
                <SidebarOption>
                    <PeopleAltOutlinedIcon />
                    <span>Shared with me</span>
                </SidebarOption>
                <SidebarOption>
                    <QueryBuilderIcon />
                    <span>Recent</span>
                </SidebarOption>
                <SidebarOption>
                    <DeleteOutlineIcon />
                    <span>Trash</span>
                </SidebarOption>
            </SidebarOptionsList>
            <hr />
            <SidebarOptionsList>
                <SidebarOption>
                    <CloudQueueIcon />
                    <span>Storage</span>
                </SidebarOption>
                <div className="progress_bar">
                    <progress size="tiny" value="1" max="100" />
                    <span>0 GB  of 10 GB used</span>
                </div>
            </SidebarOptionsList>
        </SidebarContainer>
        </>
    )
}
export default Sidebar