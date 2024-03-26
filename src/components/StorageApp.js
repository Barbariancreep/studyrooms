import Header from "./StorageComponents/Header";
import Sidebar from "./StorageComponents/Sidebar";
import Data from "./StorageComponents/Data";

function StorageApp({ username, onLogout }) {
  return (
    <>
    <Header onLogout={() => onLogout()}/>
    <div className="App">
        <Sidebar username={username} />
        <Data username={username}/>
    </div>
    </>
  );
}

export default StorageApp;
