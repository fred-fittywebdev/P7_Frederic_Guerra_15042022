import React from 'react';
import DashWidgetLg from '../../components/DashWidgetLg/DashWidgetLg';
import DashWidgetSmall from '../../components/DashWidgetSmall/DashWidgetSmall';
import FeaturedInfos from '../../components/FeaturdeInfos/FeaturedInfos';
import './DashHomepage.css';

function DashHomepage() {
	return (
		<div className="dash_homepage">
			<FeaturedInfos />
			<div className="dash_widget">
				<DashWidgetSmall />
				<DashWidgetLg />
			</div>
		</div>
	);
}

export default DashHomepage;
