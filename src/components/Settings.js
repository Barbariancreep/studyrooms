import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const SettingContainer = styled.div`
    openS{
        position: absolute;
        top: 60px;
        left: 85%;
        height: 500px;
        width: 500px;
        z-index: 99;
        background:white;
    }

    closeS{
        display:none;
    }
`
const SettingOptionList = styled.div`
    margin-top: 10px;
    `
const SettingOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
    span {
        margin-left: 15px;
        font-size: 13px;
        font-weight: 500;
        color:#000000;
        }
    `

const Settings = () => {

    const [setting, openSetting] = useState("closeS");

    const openSettings = () => {
        if (setting !== "closeS") openSetting("closeS");
        else openSetting("openS");
    };

    return(

    <SettingContainer>
        <SettingOptionList>
           <SettingOption>
                <span>Dark Mode</span>
                
            </SettingOption>
        </SettingOptionList>
    </SettingContainer>
    )
  
}
export default Settings