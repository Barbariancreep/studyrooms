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

const Data = () => {
    const userId = "admin";
    const [files, setFiles] = useState([]);
    const [openFile, setOpenFile] = useState(false);

    useEffect(() => {
        const userCollectionRef = collection(db, userId);
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

    const downloadFB = async (fbFile) => {
        try {
            // GET request from firebase url
            const response = await fetch(fbFile.data.fileURL);
            
            if (!response.ok) {
                throw new Error('Failed to fetch file');
            }

            // Create a Blob from the response
            const blob = await response.blob();

            // Create an anchor element and trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fbFile.data.filename;
            link.click();
        } 
        catch (error) {
            console.error('Error downloading file:', error);
        }

      };
    
    return (
        <>
        <Modal
            open={openFile}
            onClose={() => setOpenFile(false)}
            >
            <AddFilePopup>
                <form>
                    <input type="submit" className='modal__submit' value="Open in StudyRooms Editor"/>
                    <input type="submit" className='modal__submit' value="Download to computer"/>
                </form>
            </AddFilePopup>
        </Modal>

        <DataContainer>

            <DataListHeader>
                <p><b>Name <ArrowDownwardIcon /></b></p>
                <p><b>Owner</b></p>
                <p><b>Last Modified</b></p>
                <p><b>File Size</b></p>
            </DataListHeader>

            {files.map(file => (
                <DataListRow key={file.id}>
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