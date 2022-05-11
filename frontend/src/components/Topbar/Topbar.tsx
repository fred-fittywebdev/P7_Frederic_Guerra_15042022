import React, { useEffect, useState } from 'react';
import './Topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Topbar = () => {
	const [user, setUser] = useState([]);

	// useEffect(() => {
	// 	const user = JSON.parse(localStorage.getItem('first_name') || '');
	// 	if (user) {
	// 		setUser(user);
	// 	}
	// }, []);

	return (
		<div>
			<div className="topbar-container">
				<div className="left">
					<div>
						<span className="logo">Groupomania</span>
					</div>
				</div>
				<div className="center">
					<div className="searchbar">
						<Search className="searchbar-icon" />
						<input
							className="searchbar-input"
							type="text"
							placeholder="Rechercher"
						/>
					</div>
				</div>
				<div className="right">
					{/* <div className="topbar_links">
						{/* <span className="topbar_link">Bienvenue: {user}</span> */}
					{/* <NavLink className="navlinks-topbar" to="/">
							<span className="topbar_link">Admin</span>
						</NavLink>
						<NavLink className="navlinks-topbar" to="/login">
							<span className="topbar_link">Connexion</span>
						</NavLink>
						<NavLink className="navlinks-topbar" to="/register">
							<span className="topbar_link">Inscriptions</span>
						</NavLink> 
					</div> */}
					<div className="topbar_icons">
						<div className="topbar_icon-item">
							<Person />
							<span className="topbar_icon-badge">1</span>
						</div>
						<div className="topbar_icon-item">
							<Chat />
							<span className="topbar_icon-badge">2</span>
						</div>
						<div className="topbar_icon-item">
							<Notifications />
							<span className="topbar_icon-badge">3</span>
						</div>
					</div>
					<img
						src="/assets/profil1.png"
						alt="profil de l'utilisateur"
						className="topbar-img"
					/>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
