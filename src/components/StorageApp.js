import Header from "./StorageComponents/Header";
import Sidebar from "./StorageComponents/Sidebar";
import Data from "./StorageComponents/Data";
import styled from '@emotion/styled';

function StorageApp() {

  return (
    <>
    <Header />
    <div className="App">
        <Sidebar />
        <Data />
    </div>
    </>
  );
}

export default StorageApp;
