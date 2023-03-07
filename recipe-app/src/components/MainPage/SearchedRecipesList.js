import { useState, useEffect } from "react";

const SearchedRecipesList = (props) => {
	const [selectedRecipe, setSelectedRecipe] = useState("");

	const selectRecipe = (selectedKey) => {
		setSelectedRecipe(selectedKey);
	};

	useEffect(() => {
		setSelectedRecipe("");
	}, [props]);

	return (
		<div className="searchedRecipesList">
			<ul>
				{props.recipesArray.map((recipeObj, i) => {
					console.log(recipeObj);
					return (
						<li key={recipeObj.id}>
							<section className="recipeItem">
								<article className="recipeImage">
									<img
										onClick={() =>
											selectRecipe(recipeObj.id)
										}
										onKeyDown={(e) =>
											e.key === "Enter" &&
											selectRecipe(recipeObj.id)
										}
										tabIndex={0}
										src={`${recipeObj.image}`}
										alt={`${recipeObj.title}`}
									/>
								</article>
								<article className="recipeName">
									<h3>{recipeObj.title}</h3>
								</article>
							</section>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SearchedRecipesList;
