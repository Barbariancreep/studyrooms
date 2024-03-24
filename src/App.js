import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data";
import Settings from "./components/Settings";

function App() {
  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" 
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
    <Header/>
    <div className="App">
        <Sidebar />
        <Data />
        <Settings/>
    </div>
    </>
  );
}

export default App;
