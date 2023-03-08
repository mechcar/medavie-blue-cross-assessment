import { useState } from "react";

const SearchBar = (props) => {
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
		<section className="searchBar">
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
		</section>
	);
};

export default SearchBar;
