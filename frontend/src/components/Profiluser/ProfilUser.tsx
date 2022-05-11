import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profiluser.css';

function ProfilUser() {
	const [first_name, setFirstName] = useState('');
	const [last_name, setlastName] = useState('');
	const [username, setUserName] = useState('');
	const [profile_picture, setProfilePicture] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirm, setPasswordConfirm] = useState('');

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
		</div>
	);
}

export default ProfilUser;
