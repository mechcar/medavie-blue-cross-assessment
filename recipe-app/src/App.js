import "./App.css";
import RecipeSearch from "./pages/RecipeSearch";
import RecipeDetails from "./pages/RecipeDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RecipeSearch />} exact={true} />
				<Route path="/recipes/:id" element={<RecipeDetails />} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;
