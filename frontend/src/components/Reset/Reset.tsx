import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import './Reset.css';

interface ParamTypes {
	forgot_token: string;
}

function Reset() {
	const [password, setPassword] = useState('');
	const [password_confirm, setPasswordConfirm] = useState('');
	const [redirect, setRedirect] = useState(false);
	const { forgot_token } = useParams<ParamTypes>();

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		await axios.post('reset', {
			forgot_token,
			password,
			password_confirm: password_confirm,
		});
		console.log(forgot_token);
		setRedirect(true);
	};

	if (redirect) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			<div className="login">
				<div className="login_wrapper">
					<div className="wrapper-right">
						<h3>Réinitialiser votre mot de passe</h3>
						<div className="login_box">
							<form onSubmit={submit} className="auth-form">
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
								<button className="btn">Envoyer</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Reset;
