import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import CuisineFilter from "../components/CuisineFilter";

function RecipeSearch() {
	// Default input to display on page load
	const defaultRecipeToShow = "soup";
	// Track user input from search bar
	const [userInput, setUserInput] = useState(defaultRecipeToShow);
	// Track user selected cuisine
	const [selectedCuisine, setSelectedCuisine] = useState();
	// Store recipe data retrieved from API
	const [recipesArray, setRecipesArray] = useState([]);

	const getUserInput = (userInput) => {
		setUserInput(userInput);
	};

	const getSelectedCuisine = (selectedCuisine) => {
		setSelectedCuisine(selectedCuisine);
		console.log(selectedCuisine);
	};

	// Retrieve search results from user search
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
					// Change text to suit the response needed
					let message =
						"Couldn't find that movie. Please try another title!";
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
							"<div><h2 style='color:white;margin-bottom: 20px'>Error!</h2><p style='color:white'>" +
							message +
							"</p></div>",
					});
				} else {
					setRecipesArray(res.data.results);
				}
			});
		}
	}, [userInput]);

	// // Retrieve search results from user selected cuisine
	// useEffect(() => {
	// 	const apiKey = "a5d48136f25e4a60b14f9aab5114675e";
	// 	const apiUrl = "https://api.spoonacular.com/recipes/";

	// 	axios({
	// 		url: apiUrl,
	// 		method: "GET",
	// 		dataResponse: "json",
	// 		params: {
	// 			format: "json",
	// 			apiKey: apiKey,
	// 			query: selectedCuisine,
	// 		},
	// 	}).then((res) => {
	// 		setRecipesArray(res.data.results);
	// 	});
	// }, [selectedCuisine]);

	return (
		<section className="RecipeSearch">
			<h2>What do you feel like cooking?</h2>
			<article className="RecipeSearchBar">
				<SearchBar getUserInput={getUserInput} />
			</article>
			<CuisineFilter getSelectedCuisine={getSelectedCuisine} />
			<SearchResults recipesArray={recipesArray} />
		</section>
	);
}
export default RecipeSearch;
