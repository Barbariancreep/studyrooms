import Login from "./Login";
import Register from "./Register";
import StorageApp from "./components/StorageApp";
import TextEditorApp from "./components/TextEditorApp";
import VideoChat from "./components/VideoChat";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import DrawApp from "./components/DrawApp";

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
		window.open("/", "_self").focus()
    };

	useEffect(() => {
        // if the user is already logged in and is on the login page, send them to storage
        if (localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname === "/") {
            const storedUsername = localStorage.getItem('username') || 'dummy';
            setUsername(storedUsername);
            setIsLoggedIn(true);
			window.open("/storage", "_self").focus()
        }
    }, []);

  	return (
		<div>
			<Router>
				<Routes>

					{/* Login Page Route */}
					<Route path="/" element={<Login onLogin={handleLogin} />} />

					{/* Register Page Route */}
					<Route path="/register/" element={<Register />} />

					{/* Restricted routes */}
					{isLoggedIn ? (
						<>
						{/* Drive Home Route */}
						<Route path="/storage/" element={<StorageApp username={username} onLogout={handleLogout} />} />

						{/* Documents Route */}
						<Route path="/documents/" element={<Navigate to={`/storage/`} />} />

						{/* Opening a document given by id */}
						<Route path="/documents/:id" element={<TextEditorApp />} />

						{/* Opening the drawing page from editor  */}
						<Route path="/documents/:id/draw" element={<DrawApp />} />
						</>
					) : () => window.open("/", "_self").focus()}
				</Routes>
			</Router>

			{ (isLoggedIn && window.location.pathname) !== "/" ? (<VideoChat />) : null}
		</div>
  	);
}

// Exporting the JSX component to App.js
export default App;

