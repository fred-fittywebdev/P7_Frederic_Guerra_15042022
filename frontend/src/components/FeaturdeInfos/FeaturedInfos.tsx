import { Equalizer, PriorityHigh, Report } from '@material-ui/icons';
import React from 'react';
import './FeaturedInfos.css';

function FeaturedInfos() {
	return (
		<div className="featured">
			<div className="featured_item">
				<span className="featured_item-title">Publications</span>
				<div className="featured_item-container">
					<span className="featured_item-total">9 </span>
					<Equalizer className="item-icon positive" />
				</div>
				<span className="featured_item-sub">
					Nombre total de publications
				</span>
			</div>
			<div className="featured_item">
				<span className="featured_item-title">Utilisateurs</span>
				<div className="featured_item-container">
					<span className="featured_item-total">6 </span>
					<Equalizer className="item-icon positive" />
				</div>
				<span className="featured_item-sub">
					Nombre total d'utilisiateurs
				</span>
			</div>
			<div className="featured_item">
				<span className="featured_item-title">Signalements</span>
				<div className="featured_item-container">
					<span className="featured_item-total">2 </span>
					<Report className="item-icon negative" />
				</div>
				<span className="featured_item-sub">
					Nombre total de signalements
				</span>
			</div>
		</div>
	);
}

export default FeaturedInfos;
