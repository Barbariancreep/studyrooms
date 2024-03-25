import StorageApp from "./components/StorageApp";
import TextEditorApp from "./components/TextEditorApp";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

function App({Component,pageProps}) {

  	return (
		<Router>
			<Routes>
				<Route path="/" element={<StorageApp />} />
				<Route path="/documents/" element={<Navigate to={`/`} />} />
				<Route path="/documents/:id" element={<TextEditorApp />} />
			</Routes>
		</Router>
  	);
}

export default App;
