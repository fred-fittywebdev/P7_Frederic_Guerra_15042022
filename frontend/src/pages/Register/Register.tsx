import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import './Register.css';

function Register() {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password_confirm, setPasswordConfirm] = useState('');

	const register = async (e: SyntheticEvent) => {
		e.preventDefault();

		const { data } = await axios.post('register', {
			first_name,
			last_name,
			email,
			password,
			password_confirm,
		});

		console.log(data);
	};

	return (
		<div>
			<div className="login">
				<div className="login_wrapper">
					<div className="wrapper-left">
						<img src="/assets/icon.svg" alt="" />
					</div>
					<div className="wrapper-right">
						<div className="login_box">
							<form onSubmit={register} className="auth-form">
								<h2>Enregistrement</h2>
								<label>
									<span>Nom:</span>
									<input
										onChange={(e) =>
											setLastName(e.target.value)
										}
										required
										type="text"
									/>
								</label>
								<label>
									<span>Prénom:</span>
									<input
										onChange={(e) =>
											setFirstName(e.target.value)
										}
										required
										type="text"
									/>
								</label>
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
									<span>Mot de passe:</span>
									<input
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
										type="password"
									/>
								</label>
								<label>
									<span>Mot de passe confirmation:</span>
									<input
										onChange={(e) =>
											setPasswordConfirm(e.target.value)
										}
										required
										type="password"
									/>
								</label>
								{/* <label>
							<span>Image de profil:</span>
							<input required type="file" />
						</label> */}
								<button className="btn">Envoyer</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
