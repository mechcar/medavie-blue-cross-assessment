import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const RecipeDetails = () => {
	// Retrieve props
	const { state } = useLocation();

	// Store recipe information data retrieved from API
	const [recipeDetails, setRecipeDetails] = useState([]);

	// Retrieve search results from user search
	useEffect(() => {
		const recipeID = state.recipeObj.id;
		const apiKey = "3b686c6034dd41399f2555f0e367afd0";
		const apiUrl = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false`;

		axios({
			url: apiUrl,
			method: "GET",
			dataResponse: "json",
			params: {
				format: "json",
				apiKey: apiKey,
			},
		}).then((res) => {
			setRecipeDetails(res.data);
		});
	}, []);

	console.log(recipeDetails);

	return (
		<section>
			<h1>{recipeDetails.title}</h1>
			<img src={recipeDetails.image} alt={recipeDetails.title} />
			<article className="healthInformation">
				<h3>Health Information</h3>
				<ul className="healthInformationList">
					{recipeDetails.dairyFree ? <li>Dairy-Free</li> : ""}
					{recipeDetails.glutenFree ? <li>Gluten-Free</li> : ""}
					{recipeDetails.vegetarian ? <li>Vegatarian</li> : ""}
					{recipeDetails.vegan ? <li>Vegan</li> : ""}
				</ul>
			</article>
			<article className="ingredients">
				<h3>Ingredients</h3>
				<ul className="ingredientsList">
					{/* Ensure that array populate, could be mitigated with Typescript */}
					{Array.isArray(recipeDetails.extendedIngredients) &&
						recipeDetails.extendedIngredients.map((ingredient) => {
							return (
								<li>
									{`${ingredient.amount} ${ingredient.unit} ${ingredient.originalName}`}
								</li>
							);
						})}
				</ul>
			</article>
			<section className="cookingInstructions">
				<h3>Cooking Instructions</h3>
				<article
					dangerouslySetInnerHTML={{
						__html: recipeDetails.instructions,
					}}
				></article>
			</section>
		</section>
	);
};
export default RecipeDetails;
