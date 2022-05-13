import axios, { AxiosError } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, Redirect } from 'react-router-dom';
import './Login.css';
import { useCurrentUser } from '../../Context/UseCurrentUser';
import { strictEqual } from 'assert';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userRole, setUserRole] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [isValid, setIsValid] = useState(false);

	type ServerError = { errorMessage: string };

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const { data } = await axios.post('login', {
				email,
				password,
			});
			setRedirect(true);
			setUserRole(data.user.is_admin);
			setIsValid(data.user.is_valid);
			// localStorage.setItem(
			// 	'first_name',
			// 	JSON.stringify(data.user.first_name)
			// );
			localStorage.setItem('token', JSON.stringify(data.token));
			// localStorage.setItem('role', JSON.stringify(data.user.role.name));

			console.log(data.token);
			console.log(userRole);
		} catch (error) {
			const serverError = error as AxiosError;
			if (serverError.response) {
				console.log(serverError.response.data.message);
				toast.warning(serverError.response.data.message);
			}
		}
	};

	if (redirect) {
		return <Redirect to="/home" />;
	}

	return (
		<div>
			<div className="login">
				<div className="login_wrapper">
					<div className="wrapper-left">
						<h3 className="left-logo">Groupomania</h3>
						<p className="left-description">
							Bienvenue sur Groupomania, veuillez lire les
							conditions d'utilisation avant de vous connecter.
							Une fois connecté n'oubliez pas de modifier votre
							mot de passe. Veillez à rester respectueux dans vos
							publications, n'oubliez pas que ce sont vos
							collègues de travail !
						</p>
					</div>
					<div className="wrapper-right">
						<div className="login_box">
							<form onSubmit={submit} className="auth-form">
								<h2 className="login-title">Connectez-vous</h2>
								<label>
									<span>Email:</span>
									<input
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
										type="email"
									/>
								</label>
								<label>
									<span>Password:</span>
									<input
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
										type="password"
									/>
								</label>
								<button className="btn">Connexion</button>
							</form>
							<NavLink to="/forgot" className="forgot-link">
								Mot de passe oublié?{' '}
							</NavLink>
						</div>
						<ToastContainer
							position="top-center"
							autoClose={2000}
							closeOnClick
							pauseOnHover
							theme="colored"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
