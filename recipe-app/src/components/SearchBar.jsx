import { useState } from "react";

const SearchBar = (props) => {
	const [userInput, setUserInput] = useState("");

	// Track user input in search bar
	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	// Pass user input back to parent on form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		props.getUserInput(userInput);
		setUserInput("");
	};

	return (
		<article className="searchBar">
			<label>Search for Recipes:</label>
			<form action="submit" onSubmit={handleSubmit}>
				<label className="sr-only" htmlFor="SearchInput"></label>
				<input
					type="text"
					id="SearchInput"
					className="SearchInput"
					placeholder="Recipe..."
					onChange={handleChange}
					autoComplete="off"
					value={userInput}
					required
				/>
				<input className="SearchBarBtn" type="submit" value="Search" />
			</form>
		</article>
	);
};

export default SearchBar;
