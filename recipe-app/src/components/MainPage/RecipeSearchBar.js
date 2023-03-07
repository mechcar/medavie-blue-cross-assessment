import { useState } from "react";

const RecipeSearchBar = (props) => {
	const [userInput, setUserInput] = useState("");

	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.getUserInput(userInput);
		setUserInput("");
	};

	return (
		<div className="recipeSearchBar">
			<h2> What do you feel like cooking?</h2>
			<form action="submit" onSubmit={handleSubmit}>
				<label className="sr-only" htmlFor="recipeSearchInput"></label>
				<input
					type="text"
					id="recipeSearchInput"
					className="recipeSearchInput"
					placeholder="Recipe Title..."
					onChange={handleChange}
					autoComplete="off"
					value={userInput}
					required
				/>
				<input
					className="recipeSearchBarBtn"
					type="submit"
					value="Search"
				/>
			</form>
		</div>
	);
};

export default RecipeSearchBar;
