import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Forgot.css';

toast.configure();

function Forgot() {
	const [email, setEmail] = useState('');

	const submit = async (e: SyntheticEvent) => {
		e.preventDefault();

		const response = await axios.post('forgot', {
			email,
		});
		console.log(response);

		toast.success('un lien vous a été envoyé par mail');
	};

	return (
		<div>
			<div className="login">
				<div className="login_wrapper">
					<div className="wrapper-right">
						<h3>Entrez votre email</h3>
						<div className="login_box">
							<ToastContainer
								position="top-center"
								autoClose={2000}
								closeOnClick
								pauseOnHover
								theme="colored"
							/>
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
								<button className="btn">Envoyer</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Forgot;
