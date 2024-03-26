// allows us to style our components here in JS
import styled from '@emotion/styled';
import {ThemeProvider} from '@emotion/react';
import React from 'react';
import useDarkMode from "./useDarkMode"
import ThemeToggleContext from '../../contexts/ThemeToggleContext';
import {darkTheme,lightTheme} from '../../Theme';

// Icons from MUI
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// ball
import { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import { getDocs, query, where, collection, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";


const DataContainer = styled.div`
    flex: 1 1;
    padding: 0px 0px 0px 20px;
    background:rgb(248, 248, 248) ;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
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

const Data = (props) => {
    const userId = "admin";
    const userCollectionRef = collection(db, userId);
    const [files, setFiles] = useState([]);

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

    async function deleteFile(fileToDelete) {
        await deleteDoc(doc(db, userId, fileToDelete.id)); // delete doc
        var fileRef = ref(storage, `${userId}/${fileToDelete.data.filename}`);
        if (fileRef) {
            deleteObject(fileRef); // delete file
        }

        //remove html element
        const updatedFiles = files.filter(file => file.id !== fileToDelete.id);
        setFiles(updatedFiles);
    }
    const darkMode = useDarkMode(true);
    const currentTheme = darkMode.value ? darkTheme : lightTheme;

    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
        <ThemeProvider theme={currentTheme}>
            {isMounted && (
          <ThemeToggleContext.Provider
            value={{
              isDarkTheme: darkMode.value,
              toggleTheme: darkMode.toggle,
            }}
          >
        
        <DataContainer>

            <DataListHeader>{props.children}
                <p><b>Name <ArrowDownwardIcon /></b></p>
                <p><b>Owner</b></p>
                <p><b>Last Modified</b></p>
                <p><b>File Size</b></p>
            </DataListHeader>
            
            {files.map(file => (
                <DataListRow key={file.id}>{props.children}
                    <div onClick={() => openFile(file)}>
                        <p>{file.data.filename}</p>
                        <p>{userId}</p>
                        <p>{secondsToDate(file.data.timestamp.seconds)}</p>
                        <p>{file.data.filesize} B</p>
                    </div>
                    <div onClick={() => deleteFile(file)}><DeleteOutlineIcon/></div>
                </DataListRow>
            ))}
        
        </DataContainer>
        </ThemeToggleContext.Provider>
        )}
        </ThemeProvider>
        </>
    )
}

export default Data