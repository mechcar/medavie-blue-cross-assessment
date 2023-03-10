import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchResults = (props, recipes) => {
	const [selectedRecipe, setSelectedRecipe] = useState("");

	useEffect(() => {
		setSelectedRecipe("");
	}, [props]);

	return (
		<section className="RecipeSearchResults">
			{props.recipesArray.map((recipeObj) => {
				return (
					<Link
						to={`recipes/${recipeObj.id}`}
						state={{ recipeObj }}
						id={recipeObj.id}
						key={recipeObj.id}
					>
						<article className="RecipeSearchResult">
							<img src={recipeObj.image} alt={recipeObj.title} />
							<h3>{recipeObj.title}</h3>
						</article>
					</Link>
				);
			})}
		</section>
	);
};

export default SearchResults;
