const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
	const pageNumbers = [];

	// Generate page numbers based on total number of recipes
	for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => {
					return (
						<li key={number} className="pageItem">
							<button
								className="pageToggle"
								onClick={() => paginate(number)}
							>
								{number}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Pagination;
