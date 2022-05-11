import { Visibility } from '@material-ui/icons';
import React from 'react';
import './DashWidgetSmall.css';

function DashWidgetSmall() {
	return (
		<div className="widget_small">
			<span className="widget_small-title">Nouveaux utilisateurs</span>
			<ul className="widget_small-list">
				<li className="widget_small-item">
					<img
						src="/assets/peach.png"
						alt=""
						className="widget_small-profile"
					/>
					<div className="widget_small-user">
						<span className="user-first-name">
							Clémentine Gerard
						</span>
						<span className="user-role">Administrateur</span>
					</div>
					<button className="widget_small-btn">
						<Visibility className="btn-icon" />
						Liste
					</button>
				</li>
				<li className="widget_small-item">
					<img
						src="/assets/mario.png"
						alt=""
						className="widget_small-profile"
					/>
					<div className="widget_small-user">
						<span className="user-first-name">Alexis Meunier</span>
						<span className="user-role">Membres</span>
					</div>
					<button className="widget_small-btn">
						<Visibility className="btn-icon" />
						Liste
					</button>
				</li>
				<li className="widget_small-item">
					<img
						src="/assets/mario.png"
						alt=""
						className="widget_small-profile"
					/>
					<div className="widget_small-user">
						<span className="user-first-name">Ethan Leroy</span>
						<span className="user-role">Membres</span>
					</div>
					<button className="widget_small-btn">
						<Visibility className="btn-icon" />
						Liste
					</button>
				</li>
				<li className="widget_small-item">
					<img
						src="/assets/peach.png"
						alt=""
						className="widget_small-profile"
					/>
					<div className="widget_small-user">
						<span className="user-first-name">Coline lambert</span>
						<span className="user-role">Modérateur</span>
					</div>
					<button className="widget_small-btn">
						<Visibility className="btn-icon" />
						Liste
					</button>
				</li>
				<li className="widget_small-item">
					<img
						src="/assets/peach.png"
						alt=""
						className="widget_small-profile"
					/>
					<div className="widget_small-user">
						<span className="user-first-name">Victoria Sims</span>
						<span className="user-role">Membres</span>
					</div>
					<button className="widget_small-btn">
						<Visibility className="btn-icon" />
						Liste
					</button>
				</li>
			</ul>
		</div>
	);
}

export default DashWidgetSmall;
