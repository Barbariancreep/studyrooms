import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Data from "./components/Data";
import Settings from "./components/Settings";
import { ThemeContext, ThemeProvider } from "./Theme";
import React, { useContext } from "react";


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider>
    <div className={'App ${theme}'}>
    <Header/>
    <div className="App">
        <Sidebar />
        <Data />
        <Settings/>
    </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
