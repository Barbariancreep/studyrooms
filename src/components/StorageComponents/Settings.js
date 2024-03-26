import styled from '@emotion/styled';
import Modal from '@mui/material/Modal';
import React, { useState, useContext } from "react";

const SettingContainer = styled.div`
        position: absolute;
        top: 60px;
        left: 85%;
        height: 500px;
        width: 500px;
        z-index: 99;
        background: rgb(248, 248, 248);
        border-left: 1px solid black;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
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
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        }
    `

const Settings =(props) => {

    return(
    
    <SettingContainer className={props.className}>
        {props.title}
        <SettingOptionList className={'list'}>
           <SettingOption >
                <span> Mode</span>
            </SettingOption>
        </SettingOptionList>
    </SettingContainer>
    )
  
}
export default Settings