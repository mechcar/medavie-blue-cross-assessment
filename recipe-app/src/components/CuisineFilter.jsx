import { useState, useEffect } from "react";
import supportedCuisines from "../data/supportedCuisines";
import axios from "axios";

const CuisineFilter = (props) => {
	const [selectedCuisine, setSelectedCuisine] = useState("");
	const [recipesArray, setRecipesArray] = useState([]);
	const handleChange = (e) => {
		setSelectedCuisine(e.target.value);
		props.getSelectedCuisine(e.target.value);
	};

	return (
		<article className="CuisineFilter">
			<label>Filter by Cuisine:</label>	
			<select
				value={selectedCuisine}
				name="cusineOption"
				onChange={handleChange}
			>
				{supportedCuisines.map((cuisine) => {
					return (
						<option key={cuisine} value={cuisine}>
							{cuisine}
						</option>
					);
				})}
			</select>
		</article>
	);
};

export default CuisineFilter;
