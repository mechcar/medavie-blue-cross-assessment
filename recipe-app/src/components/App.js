import "../App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import MainPage from "./MainPage/MainPage";

function App() {
	return (
		<Router>
			<div className="App">
				<header>
					<Link to="/">
						<h1>Recipe App</h1>
					</Link>
				</header>

				<main>
					<MainPage />
				</main>
			</div>
		</Router>
	);
}
export default App;
