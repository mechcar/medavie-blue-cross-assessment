import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import CuisineFilter from "../components/CuisineFilter";
import Pagination from "../components/Pagination";

function RecipeSearch() {
	// Default input to display on page load
	const defaultRecipeToShow = "soup";
	// Track user input from search bar
	const [userInput, setUserInput] = useState(defaultRecipeToShow);
	// Track user selected cuisine
	const [selectedCuisine, setSelectedCuisine] = useState();
	// Store recipe data retrieved from API
	const [recipesArray, setRecipesArray] = useState([]);

	// Track current page number
	const [currentPage, setCurrentPage] = useState(1);
	// Manage number of items per page
	const [recipesPerPage, setRecipesPerPage] = useState(5);
	// Track current recipes being displayed
	const [currentRecipes, setCurrentRecipes] = useState([]);

	// Retrieve user input from SearchBar component
	const getUserInput = (userInput) => {
		setUserInput(userInput);
	};

	// Retrieve selected cuisine value from CuisineFilter component
	const getSelectedCuisine = (selectedCuisine) => {
		setSelectedCuisine(selectedCuisine);
	};

	// Call Spoonacular API when user searches for a recipe
	useEffect(() => {
		const apiKey = "3b686c6034dd41399f2555f0e367afd0";
		const apiUrl = "https://api.spoonacular.com/recipes/complexSearch";

		if (userInput !== "") {
			axios({
				url: apiUrl,
				method: "GET",
				dataResponse: "json",
				params: {
					format: "json",
					apiKey: apiKey,
					query: userInput,
				},
			}).then((res) => {
				if (res.data.results.length === 0) {
					setUserInput("");
					// Sweet Alert error handling message
					let message = "No recipe results!";
					Swal.fire({
						background: "#242424",
						icon: "warning",
						iconColor: "#e50914",
						confirmButtonText: "OK",
						confirmButtonColor: "#e50914",
						allowEnterKey: true,
						allowEscapeKey: true,
						html:
							// Change title to suit the application
							"<section><h2 style='color:white;margin-bottom: 20px'>Error!</h2><p style='color:white'>" +
							message +
							"</p></section>",
					});
				} else {
					setRecipesArray(res.data.results);
				}
			});
		}
		// Fire upon submission of user input in search bar
	}, [userInput]);

	// Call Spoonacular API when cusine selection changes
	useEffect(() => {
		const apiKey = "3b686c6034dd41399f2555f0e367afd0";
		const apiUrl = "https://api.spoonacular.com/recipes/complexSearch";

		axios({
			url: apiUrl,
			method: "GET",
			dataResponse: "json",
			params: {
				format: "json",
				apiKey: apiKey,
				query: selectedCuisine,
			},
		}).then((res) => {
			setRecipesArray(res.data.results);
		});
		// Fire upon each change to the value of selected Cuisine
	}, [selectedCuisine]);

	// Set current recipes for pagination
	useEffect(() => {
		const indexOfLastRecipe = currentPage * recipesPerPage;
		const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

		setCurrentRecipes(
			recipesArray.slice(indexOfFirstRecipe, indexOfLastRecipe)
		);
	}, [currentPage, recipesPerPage, recipesArray]);

	// Change page on click
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<section className="RecipeSearch">
            <h1>Recipe App - Josh Carson</h1>
			<h2>What do you feel like cooking?</h2>
			<section className="RecipeSearchInputs">
				<SearchBar getUserInput={getUserInput} />
				<CuisineFilter getSelectedCuisine={getSelectedCuisine} />
			</section>
			<SearchResults recipesArray={currentRecipes} />
			<Pagination
				recipesPerPage={recipesPerPage}
				totalRecipes={recipesArray.length}
				paginate={paginate}
			/>
		</section>
	);
}
export default RecipeSearch;
