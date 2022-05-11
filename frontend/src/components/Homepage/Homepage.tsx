import React from 'react';
import Feed from '../Feed/Feed';
// import RightBar from '../RightBar/RightBar';
import './Homepage.css';

function Homepage() {
	return (
		<div className="homepage">
			<div className="homepage_feed">
				<Feed />
				{/* <RightBar /> */}
			</div>
		</div>
	);
}

export default Homepage;
