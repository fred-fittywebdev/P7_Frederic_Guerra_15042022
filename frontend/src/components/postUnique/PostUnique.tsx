import {
	AddAlert,
	AddComment,
	DeleteForever,
	Edit,
	Favorite,
	MoreVert,
	StarRate,
	ThumbDown,
	ThumbDownOutlined,
	ThumbUp,
} from '@material-ui/icons';
import React, {
	SyntheticEvent,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react';
import './PostUnique.css';
import jwt_decode from 'jwt-decode';
import UserType from '../../Types/UserType';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import moment from 'moment';
import 'moment/locale/fr';

import axios from 'axios';
moment.locale();

interface IProps {
	post: {
		id: number;
		title: string;
		content: string;
		image: string;
		like: number;
		posted_at: Date;
		is_reported: number;
		comments: Comment[];
		user: User | null;
	};
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

const PostUnique = ({ post: p, deletPost }: IProps) => {
	const [user, setUser] = useState<UserType>();

	//modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const toggleModal = () => setIsModalOpen(!isModalOpen);

	// satte pour la fonction like/dislike
	const [like, setLike] = useState(p.like);
	const [isLiked, setIsLiked] = useState(false);

	// state pour la fonction signalement du post
	const [isReported, setIsReported] = useState(false);
	const [isDisplay, setIsDisplay] = useState('post_after');

	//comment
	const [content, setContent] = useState('');

	const likeHandler = async (id: number) => {
		if (!isLiked) {
			await axios.put(`post/${id}/like`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setLike(like + 1);
			setIsLiked(true);
		} else {
			await axios.put(`post/${id}/dislike`, {
				headers: {
					Authorization:
						'Bearer ' +
						JSON.parse(localStorage.getItem('token') || ''),
				},
			});
			setLike(like - 1);
			setIsLiked(false);
		}
	};

	const reportPost = async (id: number) => {
		if (isReported) {
			toast.warning('Vous avez déjà signalé ce post');
			return;
		}
		if (
			window.confirm(
				'Vous êtes sur le point de signaler ce post, continuer?'
			)
		) {
			if (!isReported) {
				await axios.put(`post/${id}/report`, {
					headers: {
						Authorization:
							'Bearer ' +
							JSON.parse(localStorage.getItem('token') || ''),
					},
				});
				setIsReported(true);
				toast.success("Le pot a bien été signalé a l'administrateur");
			}
		}
	};

	const addComment = async (id: number) => {
		await axios.post(`posts/${id}/comment`, {
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
			},
			content,
		});
		setContent(content);
		console.log(content);
		window.location.reload();
	};

	const readReported = (e: SyntheticEvent) => {
		setIsDisplay('post_after_hidden');
	};

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token') || '');
		const decoded: any = jwt_decode(token);
		if (decoded) {
			setUser(decoded.user);
			console.log(decoded.user);
			console.log(user?.first_name);
			console.log(user?.is_admin);
		}
	}, []);
	return (
		<div
			className="post"
			style={
				p.user?.is_admin
					? { boxShadow: '3px 3px 5px #ffd7d7' }
					: {
							boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.05)',
					  }
			}
		>
			<div className="post-wrapper">
				{p.is_reported && (
					<div
						className={isDisplay}
						onClick={
							user?.is_admin
								? () => setIsDisplay('post_after_hidden')
								: undefined
						}
					>
						<div className="after_wrapper">
							<h4 className="post_after_title">Post signalé</h4>
							<p
								style={
									user?.is_admin
										? { display: 'none' }
										: { display: 'block' }
								}
								className="post_after_content"
							>
								Le contenu de ce post est inaproprié, vous ne
								pouvez donc pas le voir pour le moment.
							</p>
							<p
								style={
									user?.is_admin
										? { display: 'block' }
										: { display: 'none' }
								}
							>
								Cliquez sur le post pour le supprimer ou le
								modifier.
							</p>
							{/* <button className="btn post_after_btn">Voir</button> */}
						</div>
					</div>
				)}
				<div key={p.id} className="post_top">
					<div className="post_top-left">
						<StarRate
							style={
								p.user?.is_admin
									? { display: 'flex' }
									: {
											display: 'none',
									  }
							}
							className="admin_icon"
							htmlColor="goldenrod"
						/>
						<span
							className="display_admin"
							style={
								p.user?.is_admin
									? { display: 'flex' }
									: {
											display: 'none',
									  }
							}
						>
							Admin
						</span>
						<img
							className="post_profile_img"
							src={
								p.user?.profile_picture
									? p.user.profile_picture
									: '/assets/peach.png'
							}
							alt="auteur du post"
						/>
						<span className="post_username">
							{p.user?.first_name}
						</span>
						<span className="post_date">
							{moment(p.posted_at).format('LLL')}
						</span>
					</div>
					<div className="post_top_right">
						<Tippy
							arrow={false}
							className="tooltip"
							theme="light"
							interactive={true}
							placement="right"
							content={<span>Modifiez votre post</span>}
						>
							<Edit htmlColor="green" onClick={toggleModal} />
						</Tippy>
					</div>
				</div>
				<div className="post_center">
					{/* TODO: conditionner l'image au cas ou le post n'en contiendrait pas */}
					{p.image && (
						<img
							className="post_img"
							src={p.image}
							alt="couverture du post"
						/>
					)}
					<span className="post-text">{p.content}</span>
				</div>
				<div className="post_bottom">
					<div className="post_bottom_left">
						<ThumbUp
							className="like_icon"
							htmlColor="blue"
							onClick={() => likeHandler(p.id)}
						/>
						<span className="post_like_counter">{like} j'aime</span>
					</div>
					<div>
						<div className="post_bottom_center">
							<AddAlert
								htmlColor="tomato"
								className="warning_icon"
								onClick={() => reportPost(p.id)}
							/>
							<span className="post_comment_text">Signaler</span>
						</div>
					</div>
					<div
						className="post_bottom_right"
						style={
							p.user?.id !== user?.id && user?.is_admin === 0
								? { display: 'none' }
								: { display: 'flex' }
						}
					>
						<DeleteForever
							htmlColor="red"
							className="warning_icon"
							onClick={() => deletPost(p.id)}
						/>
						<span className="post_comment_text">Supprimer</span>
					</div>
				</div>
				<hr className="post_hr" />
				<div className="post_comment_section">
					<span>Commentaires</span>
					<div>
						{p.comments.map((c) => {
							return (
								<span className="comment_section-content">
									{c.content}
								</span>
							);
						})}
					</div>
				</div>
				<hr className="post_hr" />
				<form className="post_comment-new">
					<input
						onChange={(e) => setContent(e.target.value)}
						placeholder="Ajoutez votre commentaire.."
						type="text"
						className="post_new"
					/>
					<AddComment
						onClick={(e) => addComment(p.id)}
						className="new-icon"
					/>
				</form>
			</div>
		</div>
	);
};

export default PostUnique;
