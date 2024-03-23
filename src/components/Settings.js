import styled from '@emotion/styled';
const SettingBar = styled.div`
    text-align:left;
    font-size:55px;
    margin: 40px;
    `
const dark = styled.div`
    data-bs-theme:"dark";
    `
const Settings = ({}) => {
    return(
        <SettingBar>
            <dark>
            <span >Dark Mode</span>
            </dark>
        </SettingBar>
    )
}
export default Settings