import {
	BugReport,
	Create,
	Help,
	PowerSettingsNew,
	RssFeed,
} from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
	return (
		<div className="sidebar">
			<nav className="sidebar_wrapper">
				<ul className="sidebar_list">
					<li className="list-items">
						<NavLink className="navlinks" to="/">
							<RssFeed className="list-icons" />
							<span className="list-text">Accueil</span>
						</NavLink>
					</li>
					<li className="list-items">
						<Create className="list-icons" />
						<span className="list-text">Ecrire</span>
					</li>
					<li className="list-items">
						<Help className="list-icons" />
						<span className="list-text">FAQ</span>
					</li>
					<li className="list-items">
						<BugReport className="list-icons" />
						<span className="list-text">Assistance</span>
					</li>
					<li className="list-items">
						<PowerSettingsNew className="list-icons" />
						<span className="list-text">Logout</span>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
