import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { IPosts, Post } from '../../Models/Post';
import PostShare from '../PostShare/PostShare';
import PostCard from '../Postcard/PostCard';
import './Feed.css';
import Paginator from '../Paginator/Paginator';
import UserType from '../../Types/UserType';

interface IPosts {
	posts: {
		id: number;
		title: string;
		content: string;
		image: string;
		like: number;
		posted_at: Date;
		is_reported: boolean;
		comments: Comment[];
		user: User | null;
	}[];
}

interface Comment {
	id: number;
	content: string;
	commented_at: Date;
	updated_at: Date;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	is_valid: boolean;
	is_admin: number;
	profile_picture: string;
}

function Feed() {
	const [user, setUser] = useState([]);

	const [posts, setPosts] = useState<IPosts['posts']>([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`posts?page=${page}`, {
				// () pour récupérer les data directement. avec .data
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setPosts(data.data);
			setLastPage(data.meta.last_page);
			console.log(data.data);
		})();
		// Pour changer de page on doit rappeller le useEffect a chaque changement, on met donc les pages en dépendences. -> Chaque fois que les pages changent le UE est appelé
	}, [page]);

	const deletPost = async (id: number) => {
		if (window.confirm('Vous aller supprimer ce post, en êtes vous sur?')) {
			await axios.delete(`post/${id}`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
		}
		setPosts(posts.filter((posts) => posts.id !== id));
		//notification
		toast.info('Le post a bien été suprimé.');
	};

	return (
		<div className="feed">
			<h4 className="feed_welcome">Fil d'actualité.</h4>
			<PostShare />
			<PostCard posts={posts} deletPost={deletPost} />
			<Paginator
				page={page}
				lastPage={lastPage}
				pageChanged={(page) => setPage(page)}
			/>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				closeOnClick
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}

export default Feed;
