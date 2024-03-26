import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Settings from './Settings';
import React, {useState} from "react";

//import { Avatar } from '@mui/base/';

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 300px auto 200px;
    align-items: center;
    padding: 5px 20px;
    height: 60px;
    border-bottom: 1px solid black;
    background-color:rgb(100, 205, 217);
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`
const HeaderLogo = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 40px;
    }
    span{
        font-size: 22px;
        margin-left: 10px;
        color: #000000;
        font-weight:600;
    }
`

const HeaderSearch = styled.div`
    display: flex;
    align-items: center;
    width: 700px;
    background-color: whitesmoke;
    padding: 12px;
    border-radius: 10px;
    input{
        background-color: transparent;
        border: 0;
        outline: 0;
        flex: 1;
    }
`
const HeaderIcons = styled.div`
    display: flex;
    align-items: center;
    span {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    svg.MuiSvgIcon-root{
        margin: 0px 10px;
    }
`
const Help = styled.div`
display: flex;
&:hover{
    border-radius: 25px;
    background-color:rgb(105, 219, 231);
    cursor: pointer;
}
`
const SettingIc = styled.div`
display: flex;
&:hover{
    border-radius: 25px;
    background-color:rgb(105, 219, 231);
    cursor: pointer;
    padding:5px;
}
`
const LogOutButton =styled.div`
display: flex;
&:hover{
    border-radius: 25px;
    background-color:rgb(105, 219, 231);
    cursor: pointer;
    padding:5px;
}
    `

const Header = (props) => {
    
    const [settingsOpen, setSettingsOpen] = useState(false);

    const toggleSettings = () => {
        setSettingsOpen(prevState => !prevState);
    }
    return (
        <>
        <HeaderContainer>
            <HeaderLogo>
                <img src="https://cdn.pixabay.com/photo/2021/08/19/16/50/bird-6558500_1280.png" alt="Phoenix Drive" />
                <span>StudyRooms</span>
            </HeaderLogo>
            <HeaderSearch>
                <SearchIcon />
                <input type="text" placeholder='Search your StudyRooms Storage' />
                <FormatAlignCenterIcon />
            </HeaderSearch>
            <HeaderIcons>
                <span>
                <Help onClick={() => window.open("https://mercury241.github.io/F29SEwebPage.github.io/", '_blank').focus()}>
                    <HelpOutlineIcon />
                </Help>
                <SettingIc onClick={toggleSettings}>
                    <SettingsIcon/>
                </SettingIc>
                    {settingsOpen && <Settings />}
                </span>
                <span>
                <LogOutButton>
                    <LogoutIcon/>
                </LogOutButton>
                </span>
            </HeaderIcons>
        </HeaderContainer>
        </>
    )
}
export default Header