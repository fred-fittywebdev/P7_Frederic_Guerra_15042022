import {
	Adb,
	Add,
	BugReport,
	CardMembership,
	Create,
	Dashboard,
	EmojiEmotions,
	Equalizer,
	Face,
	Group,
	GroupAdd,
	Help,
	LineStyle,
	MenuBook,
	PostAdd,
	PowerSettingsNew,
	RssFeed,
	Warning,
} from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DashSidebar.css';
import jwt_decode from 'jwt-decode';

function DashSidebar() {
	const [userRole, setUserRole] = useState('');

	// useEffect(() => {
	// 	// const userRole = JSON.parse(localStorage.getItem('role') || '');
	// 	const token = JSON.parse(localStorage.getItem('token') || '');
	// 	const decoded: any = jwt_decode(token);

	// 	if (decoded) {
	// 		setUserRole(decoded.is_admin);
	// 	}
	// 	console.log(userRole);
	// }, []);

	const [user, setUser] = useState([]);
	const [userPicture, setUserPicture] = useState('');

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);
		if (user) {
			setUser(decoded.user.first_name);
			setUserPicture(decoded.user.profile_picture);
			setUserRole(decoded.user.is_admin);
			console.log(userPicture);
		}
	}, []);

	const logout = async () => {
		localStorage.clear();
		window.location.href = '/';
	};

	return (
		<>
			<div className="dash_sidebar">
				<div className="dash_sidebar-wrapper">
					<div className="dash_sidebar-menu">
						<h3 className="dash_sidebar-title">Connecté</h3>
						<div className="dash_sidebar_user_wrapper">
							<span className="dash_sidebar-username">
								Bienvenue {user}
							</span>
							<img
								className="user_profile_picture"
								src={userPicture}
								alt="utilisateur"
							/>
						</div>
						<h3 className="dash_sidebar-title">Menu</h3>
						<ul className="dash_sidebar-list">
							<NavLink
								exact={true}
								activeClassName="active"
								to="/home"
							>
								<li className="dash_sidebar-item active">
									<RssFeed className="dash_sidebar-icons" />
									Acceuil
								</li>
							</NavLink>

							<NavLink
								exact={true}
								activeClassName="active"
								to="/profil"
							>
								<li className="dash_sidebar-item">
									<Face className="dash_sidebar-icons" />
									Profil
								</li>
							</NavLink>

							<NavLink
								style={
									userRole
										? { display: 'block' }
										: { display: 'none' }
								}
								exact={true}
								activeClassName="active"
								to="/user-list"
							>
								<li className="dash_sidebar-item">
									<Group className="dash_sidebar-icons" />
									Membres
								</li>
							</NavLink>

							<NavLink
								style={
									userRole
										? { display: 'block' }
										: { display: 'none' }
								}
								exact={true}
								activeClassName="active"
								to="/ajout-membre"
							>
								<li className="dash_sidebar-item">
									<GroupAdd className="dash_sidebar-icons" />
									Ajout membres
								</li>
							</NavLink>

							<NavLink
								style={
									userRole
										? { display: 'block' }
										: { display: 'none' }
								}
								exact={true}
								activeClassName="active"
								to="/post-list"
							>
								<li className="dash_sidebar-item">
									<PostAdd className="dash_sidebar-icons" />
									Posts
								</li>
							</NavLink>
							<NavLink
								exact={true}
								activeClassName="active"
								to="/"
							>
								<li
									onClick={logout}
									className="dash_sidebar-item"
								>
									<PowerSettingsNew className="dash_sidebar-icons" />
									Logout
								</li>
							</NavLink>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default DashSidebar;
