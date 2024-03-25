import Header from "./StorageComponents/Header";
import Sidebar from "./StorageComponents/Sidebar";
import Data from "./StorageComponents/Data";

function StorageApp() {
  return (
    <>
    <Header/>
    <div className="App">
        <Sidebar />
        <Data />
    </div>
    </>
  );
}

export default StorageApp;
