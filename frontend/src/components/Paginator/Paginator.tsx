import React from 'react';

const Paginator = (props: {
	page: number;
	lastPage: number;
	pageChanged: (page: number) => void;
}) => {
	const next = () => {
		if (props.page < props.lastPage) {
			props.pageChanged(props.page + 1);
			console.log(props.page);
		}
	};

	const prev = () => {
		if (props.page >= 1) {
			props.pageChanged(props.page - 1);
		}
	};

	return (
		<div>
			<nav className="page_nav">
				<ul className="page_nav-list">
					<li className="page_nav-items">
						<a href="#" className="btn" onClick={prev}>
							Precédent
						</a>
					</li>
					<li className="page_nav-items">
						<a href="#" className="btn page_btn" onClick={next}>
							Suivant
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Paginator;
