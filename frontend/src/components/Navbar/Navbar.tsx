import { BugReport, Create, Home, PowerSettingsNew } from '@material-ui/icons';
import React from 'react';
import './Navbar.css';

function Navbar() {
	return (
		<div>
			<button className="btn-menu">Click</button>
			<nav>
				<div className="logo_wrapper">
					<img
						className="wrapper_img"
						src="/assets/icon.svg"
						alt="Groupomnania logo"
					/>
				</div>
				<ul>
					<li>
						<Home />
						<span>Acceuil</span>
					</li>
					<li>
						<Create />
						<span>Poster</span>
					</li>
					<li>
						<BugReport />
						<span>Support</span>
					</li>
				</ul>

				<div className="profil-image">
					<img
						src="/assets/profil1.png"
						alt="profil de l'utilisateur"
					/>
					<div>
						<div>
							<h4>Mario</h4>
							<a href="#">Voir le profil</a>
						</div>
						<button>
							<PowerSettingsNew />
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
