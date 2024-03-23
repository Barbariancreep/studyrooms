// allows us to style our components here in JS
import styled from '@emotion/styled';

// Icons from MUI
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';

// ball
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { getDocs, query, where, collection } from 'firebase/firestore';

const DataContainer = styled.div`
    flex: 1 1;
    padding: 10px 0px 0px 20px;
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
    padding: 10px;
    p {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
`

const Data = () => {
    const userId = "admin";
    const userCollectionRef = collection(db, userId);
    const [files, setFiles] = useState([]);
    const [openFile, setOpenFile] = useState(false);

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
      
    return (
        <>
        <DataContainer>

            <DataListHeader>
                <p><b>Name <ArrowDownwardIcon /></b></p>
                <p><b>Owner</b></p>
                <p><b>Last Modified</b></p>
                <p><b>File Size</b></p>
            </DataListHeader>
            
            {files.map(file => (
                <DataListRow key={file.id} onClick={() => window.open(file.data.fileURL, '_blank').focus()}>
                    <p>{file.data.filename}</p>
                    <p>{userId}</p>
                    <p>{secondsToDate(file.data.timestamp.seconds)}</p>
                    <p>{file.data.filesize} B</p>
                </DataListRow>
            ))}

        </DataContainer>
        </>
    )
}

export default Data