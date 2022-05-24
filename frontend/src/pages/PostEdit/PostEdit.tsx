import { Cancel, EmojiEmotions, Label, PermMedia } from '@material-ui/icons';
import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './PostEdit.css';
import jwt_decode from 'jwt-decode';
import UserType from '../../Types/UserType';
import ImageUploads from '../../components/ImageUplaods/ImageUploads';

interface IProps {
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
	deletPost: (id: number) => void;
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

function PostEdit(props: any) {
	const [content, setContent] = useState('');
	const [redirect, setRedirect] = useState(false);
	const [user, setUser] = useState<UserType>();
	let id: number;

	const [image, setImage] = useState('');

	//image
	// const [file, setFile] = useState<FileList | null>(null);

	const send = async (e: SyntheticEvent) => {
		e.preventDefault();

		await axios.post(`users/${user?.id}/post`, {
			method: 'POST',
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
			content,
			image,
		});
		setContent('');
		setRedirect(true);
		window.location.reload();
	};

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);
		if (decoded) {
			setUser(decoded.user);
			console.log(decoded.user);
		}
	}, []);

	// if (redirect) {
	// 	return <Redirect to="/home" />;
	// }
	return (
		<div className="post_container">
			<div className="post_wrapper">
				<div className="post_top">
					<img
						src={user?.profile_picture}
						alt="créateur du post"
						className="post_profile_picture"
					/>
					<input
						onChange={(e) => setContent(e.target.value)}
						placeholder={`A quoi pensez-vous ${user?.first_name}?`}
						type="text"
						className="post_input"
						value={content}
					/>
				</div>
				<hr className="post_hr" />
				{image && (
					<div className="share_post_image">
						<img className="post_image" src={image} alt="" />
						<Cancel
							className="cancel_image"
							htmlColor="tomato"
							onClick={() => setImage('')}
						/>
					</div>
				)}
				<form className="post_bottom" onSubmit={send}>
					<div className="post_options">
						<div>
							{/* <label htmlFor="file" className="post-option">
								<PermMedia
									htmlColor="tomato"
									className="post_icons"
								/>
								<span className="post_option-text">Photos</span>
								<input
									style={{ display: 'none' }}
									type="file"
									id="file"
									hidden
									accept=".png, .jpg, .jpeg"
									// onChange={(e) => setFile(e.target.files)}
								/>
							</label> */}
							<ImageUploads uploaded={setImage} />
						</div>
						<div className="post-option">
							<Label htmlColor="blue" className="post_icons" />
							<span className="post_option-text">Tag</span>
						</div>
						<div className="post-option">
							<EmojiEmotions
								htmlColor="goldenrod"
								className="post_icons"
							/>
							<span className="post_option-text">Réaction</span>
						</div>
					</div>
					<input
						type="text"
						hidden
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					{console.log(image)}
					<button
						// onClick={send}
						className="btn post-btn"
						type="submit"
					>
						Poster
					</button>
				</form>
			</div>
		</div>
	);
}

export default PostEdit;
