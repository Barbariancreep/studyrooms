import Header from "./StorageComponents/Header";
import Sidebar from "./StorageComponents/Sidebar";
import Data from "./StorageComponents/Data";
import { ThemeProvider } from '../contexts/ThemeToggleContext';
import { darkTheme, lightTheme } from '../Theme';

function StorageApp(){
  const isDarkTheme = false;
  const theme = isDarkTheme ? darkTheme : lightTheme;
  return (
    <>
    <ThemeProvider theme={theme}>
    <Header />
    <div className="App">
        <Sidebar />
        <Data />
    </div>
    </ThemeProvider>
    </>
  );
}

export default StorageApp;
