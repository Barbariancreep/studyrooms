import Login from "./Login";
import LoginPage from "./components/LoginPage";
import Register from "./Register";
import StorageApp from "./components/StorageApp";
import TextEditorApp from "./components/TextEditorApp";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
	const [username, setUsername] = useState(localStorage.getItem('username') || 'dummy');

	// Function to handle user login
    const handleLogin = (username) => {
		setUsername(username);
        setIsLoggedIn(true);

		console.log(username);

		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem('username', username); 
		window.open("/storage", "_self").focus()
    };

    // Function to handle user logout
    const handleLogout = () => {
        setIsLoggedIn(false);
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('username'); // Remove username from localStorage
    };

  	return (
		<Router>
			<Routes>

				{/* Login Page Route */}
				<Route path="/" element={<LoginPage onLogin={handleLogin} />} />

				{/* Register Page Route */}
				<Route path="/register/" element={<Register />} />

				{/* Restricted routes */}
				{isLoggedIn ? (
                    <>
					{/* Drive Home Route */}
					<Route path="/storage/" element={<StorageApp username={username}/>} />

					{/* Documents Route */}
					<Route path="/documents/" element={<Navigate to={`/storage/`} />} />

					{/* Opening a document given by id */}
					<Route path="/documents/:id" element={<TextEditorApp />} />
                    </>
                ) : null}

				{/* Return user to login page if url is invalid or unauthorised */}
				
			</Routes>
		</Router>
  	);
}

// Exporting the JSX component to App.js
export default App;

