import Login from "./Login";
import Register from "./Register";
import StorageApp from "./components/StorageApp";
import TextEditorApp from "./components/TextEditorApp";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App() {

  	return (
		<Router>
			<Routes>

				{/* Login Page Route */}
				<Route path="/" element={<Login />} />

				{/* Register Page Route */}
				<Route path="/register/" element={<Register />} />

				{/* Drive Home Route */}
				<Route path="/storage/" element={<StorageApp />} />

				{/* Documents Route */}
				<Route path="/documents/" element={<Navigate to={`/storage/`} />} />

				{/* Opening a document given by id */}
				<Route path="/documents/:id" element={<TextEditorApp />} />
			</Routes>
		</Router>
  	);
}

// Exporting the JSX component to App.js
export default App;

