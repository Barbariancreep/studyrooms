import Login from "./Login";
import Register from "./Register";
import StorageApp from "./components/StorageApp";
import TextEditorApp from "./components/TextEditorApp";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App() {

  	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register/" element={<Register />} />
				<Route path="/storage/" element={<StorageApp />} />
				<Route path="/documents/" element={<Navigate to={`/storage/`} />} />
				<Route path="/documents/:id" element={<TextEditorApp />} />
			</Routes>
		</Router>
  	);
}

export default App;
