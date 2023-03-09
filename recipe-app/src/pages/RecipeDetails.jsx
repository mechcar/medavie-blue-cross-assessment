import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
			setTimeout(() => {
				setRecipeDetails(res.data);
			}, 1500);
		});
	}, [state.recipeObj.id]);

	return (
		<section className="RecipeDetails">
			<Link to="/" className="backLink">
				Go back
			</Link>
			<h1>{recipeDetails.title}</h1>
			<section className="RecipeDetailsTopRow">
				<article className="healthInformation">
					<h3>Health Information</h3>
					<ul className="healthInformationList">
						{recipeDetails.dairyFree ? (
							<li>
								Dairy-Free: <span className="check">✓</span>
							</li>
						) : (
							<li>
								Dairy-Free: <span className="cross">✖</span>
							</li>
						)}
						{recipeDetails.glutenFree ? (
							<li>
								Gluten-Free: <span className="check">✓</span>
							</li>
						) : (
							<li>
								Gluten-Free: <span className="cross">✖</span>
							</li>
						)}
						{recipeDetails.vegetarian ? (
							<li>
								Vegatarian: <span className="check">✓</span>
							</li>
						) : (
							<li>
								Vegetarian: <span className="cross">✖</span>
							</li>
						)}
						{recipeDetails.vegan ? (
							<li>
								Vegan: <span className="check">✓</span>
							</li>
						) : (
							<li>
								Vegan: <span className="cross">✖</span>
							</li>
						)}
					</ul>
				</article>
				<img src={recipeDetails.image} alt={recipeDetails.title} />
			</section>
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
