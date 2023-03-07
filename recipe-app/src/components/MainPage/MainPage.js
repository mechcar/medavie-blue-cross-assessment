import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import RecipeSearchBar from "./RecipeSearchBar";
import SearchedRecipesList from "./SearchedRecipesList";

const MainPage = () => {
	const defaultRecipeToShow = "recipe";
	const [userInput, setUserInput] = useState(defaultRecipeToShow);
	const [recipesArray, setRecipesArray] = useState([]);

	// import API using Axios
	useEffect(() => {
		const apiKey = "a5d48136f25e4a60b14f9aab5114675e";
		const apiUrl = "https://api.spoonacular.com/recipes/complexSearch";

		if (userInput !== "") {
			console.log(userInput);
			axios({
				url: apiUrl,
				method: "GET",
				dataResponse: "json",
				params: {
					// format: "json",
					apiKey: apiKey,
					query: userInput,
					number: 20,
				},
			}).then((res) => {
				if (res.data.results.length === 0) {
					setUserInput("");
					// Change text to suit the response needed
					let message =
						"Couldn't find that recipe. Please try searching for another!";
					Swal.fire({
						background: "#000",
						icon: "warning",
						iconColor: "#000",
						confirmButtonText: "OK",
						confirmButtonColor: "#000",
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
					console.log(recipesArray);
				}
			});
		}
	});

	const getUserInput = (userInput) => {
		setUserInput(userInput);
	};

	return (
		<div className="mainPage">
			<RecipeSearchBar getUserInput={getUserInput} />
			<section className="mainPageFlexContainer">
				<SearchedRecipesList recipesArray={recipesArray} />
			</section>
		</div>
	);
};

export default MainPage;
