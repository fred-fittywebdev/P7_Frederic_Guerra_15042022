import React, { useEffect, useState } from 'react';
import './UserList.css';
import Paginator from '../../components/Paginator/Paginator';
import { Delete } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { User } from '../../Models/User';
import PostCard from '../../components/PostShare/PostShare';
import DashSidebar from '../../components/DashSidebar/DashSidebar';
import Topbar from '../../components/Topbar/Topbar';

function UserList() {
	const [usersList, setUsersList] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);

	// on bloque / débloque un utilisateur
	const [unblock, setUnblock] = useState(false);
	const [block, setBlock] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const unblockuser = async (id: number) => {
		if (
			window.confirm(
				"Vous allez débloquer l'accès du forum pour cet utilisateur."
			)
		) {
			await axios.put(`users/${id}/validate`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
		}

		setUnblock(true);
		setRedirect(true);
	};

	const blockuser = async (id: number) => {
		if (
			window.confirm('Cet utilisateur ne pourra plus accéder au forum.')
		) {
			await axios.put(`users/${id}/block`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
		}

		setUnblock(true);
		setRedirect(true);
	};

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`users?page=${page}`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setUsersList(data.data);
			setLastPage(data.meta.last_page);
		})();
	}, [page]);

	if (redirect) {
		return <Redirect to="/home" />;
	}

	return (
		<>
			<Topbar />
			<div className="user_list">
				<DashSidebar />
				<div className="table_wrapper">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Photo</th>
								<th>Prénom</th>
								<th>Nom</th>
								<th>Pseudo</th>
								<th>Email</th>
								<th>Actif</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{usersList.map((usersList: User) => {
								return (
									<tr key={usersList.id}>
										<td>{usersList.id}</td>
										<td>
											<img
												src={usersList.profile_picture}
												width="50"
											/>
										</td>
										<td>{usersList.first_name}</td>
										<td>{usersList.last_name}</td>
										<td>{usersList.username}</td>
										<td>{usersList.email}</td>
										{!usersList.is_valid && (
											<td
												style={
													!usersList.is_valid
														? {
																textDecoration:
																	'underline',
																textUnderlineOffset:
																	'2px',
																color: '#fd2d01',
																textAlign:
																	'right',
														  }
														: {
																backgroundColor:
																	'white',
														  }
												}
											>
												Non
											</td>
										)}
										{usersList.is_valid && <td>Oui</td>}
										<td>
											{usersList.is_valid && (
												<button
													onClick={() =>
														blockuser(usersList.id)
													}
													className="btn btn_user_list"
												>
													Bloquer
												</button>
											)}
											{!usersList.is_valid && (
												<button
													onClick={() =>
														unblockuser(
															usersList.id
														)
													}
													className="btn btn_user_list"
												>
													Débloquer
												</button>
											)}
											<button className="btn">
												Supprimer
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="action_wrapper"></div>
					<Paginator
						page={page}
						lastPage={lastPage}
						pageChanged={(page) => setPage(page)}
					/>
				</div>
			</div>
		</>
	);
}

export default UserList;
