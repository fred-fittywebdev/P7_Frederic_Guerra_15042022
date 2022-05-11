import React, { useState, SyntheticEvent } from 'react';
import { Redirect } from 'react-router-dom';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import Topbar from '../../components/Topbar/Topbar';
import axios from 'axios';
import './Ajoutmembre.css';

function Ajoutmembre() {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [redirect, setRedirect] = useState(false);

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		await axios.post('users', {
			// headers: {
			// 	Authorization:
			// 		'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			// },
			first_name,
			last_name,
			email,
		});

		setRedirect(true);
	};

	if (redirect) {
		return <Redirect to="/user-list" />;
	}

	return (
		<>
			<Topbar />
			<div className="ajout_membre_wrapper">
				<DashSidebar />
				<div className="ajout_membre_form">
					<form className="profil_form" onSubmit={submit}>
						<h2>Création d'un nouveau membre.</h2>
						<label>
							<span>Nom:</span>
							<input
								onChange={(e) => setLastName(e.target.value)}
								defaultValue={last_name}
								required
								type="text"
							/>
						</label>
						<label>
							<span>Prénom:</span>
							<input
								onChange={(e) => setFirstName(e.target.value)}
								defaultValue={first_name}
								required
								type="text"
							/>
						</label>
						<label>
							<span>Email:</span>
							<input
								onChange={(e) => setEmail(e.target.value)}
								defaultValue={email}
								required
								type="email"
							/>
						</label>
						<button className="btn">Envoyer</button>
					</form>
				</div>
			</div>
			;
		</>
	);
}

export default Ajoutmembre;
