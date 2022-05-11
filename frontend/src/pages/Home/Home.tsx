import React from 'react';
import './Home.css';
import Topbar from '../../components/Topbar/Topbar';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from '../../components/Homepage/Homepage';
import Profil from '../Profil/Profil';
import ProfilUser from '../../components/Profiluser/ProfilUser';

const Home = () => {
	return (
		<>
			<Topbar />
			<div className="home_container">
				<DashSidebar />

				<Homepage />
			</div>
		</>
	);
};

export default Home;
