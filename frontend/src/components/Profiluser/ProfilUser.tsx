import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profiluser.css';

function ProfilUser() {
	const [first_name, setFirstName] = useState('');
	const [last_name, setlastName] = useState('');
	const [username, setUserName] = useState('');
	const [id, setProfileID] = useState(0);
	const [profile_picture, setProfilePicture] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirm, setPasswordConfirm] = useState('');
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get('user', {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setFirstName(data.first_name);
			setlastName(data.last_name);
			setUserName(data.username);
			setProfilePicture(data.profile_picture);
			setProfileID(data.id);
		})();
	}, []);

	const infoSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		await axios.put('users/info', {
			// headers: {
			// 	Authorization:
			// 		'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			// },
			first_name,
			last_name,
			username,
			profile_picture,
		});

		toast.success('Modifications enregistrées.');
		console.log(id);
	};
	const passwordSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		await axios.put('users/password', {
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
			password,
			password_confirm,
		});
		toast.success('Mot de passe modifié avec success.');
	};

	const del = async (id: number) => {
		if (
			window.confirm(
				"Vous allez supprimer votre compte, cette action est irréversible ! Vous n'aurez plus accès au forum."
			)
		) {
			await axios.delete(`users/${id}`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
		}
		setRedirect(true);
	};

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<div className="profileRightTop">
				<div className="profileCover">
					<img
						className="profileUserImg"
						src={profile_picture}
						alt=""
					/>
				</div>
				<div className="profileInfo">
					<h4 className="profileInfoName">
						{' '}
						{first_name} {last_name}{' '}
					</h4>
					<h3 className="profileInfoUserName"> {username} </h3>
					<span className="profileInfoDesc">
						Modifiez vos informations personnelles
					</span>
				</div>
			</div>
			<div className="profile_wrapper">
				<form onSubmit={infoSubmit} className="profile-form">
					<h2>Enregistrement</h2>
					<label>
						<span>Nom:</span>
						<input
							onChange={(e) => setlastName(e.target.value)}
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
						<span>Pseudo:</span>
						<input
							onChange={(e) => setUserName(e.target.value)}
							defaultValue={username}
							required
							type="text"
						/>
					</label>
					<label>
						<span>Image de profil:</span>
						<input type="file" />
					</label>
					<button className="btn">Envoyer</button>
					<ToastContainer
						position="top-center"
						autoClose={2000}
						closeOnClick
						pauseOnHover
						theme="colored"
					/>
				</form>
				<form onSubmit={passwordSubmit} className="profile-form">
					<h2>Modifiez votre mot de passe</h2>
					<label>
						<span>Mot de passe:</span>
						<input
							onChange={(e) => setPassword(e.target.value)}
							required
							type="password"
						/>
					</label>
					<label>
						<span>Mot de passe confirmation:</span>
						<input
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
							type="password"
						/>
					</label>
					{/* <label>
							<span>Image de profil:</span>
							<input required type="file" />
						</label> */}
					<button className="btn">Envoyer</button>
					<ToastContainer
						position="top-center"
						autoClose={2000}
						closeOnClick
						pauseOnHover
						theme="colored"
					/>
				</form>
			</div>
			<div className="profileInfoDelete">
				<div className="deleteWrapper">
					<h3 className="profileInfoDeleteText">
						Supprimer votre compte
					</h3>
					<button onClick={() => del(id)} className="btn">
						Supprimer
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProfilUser;
