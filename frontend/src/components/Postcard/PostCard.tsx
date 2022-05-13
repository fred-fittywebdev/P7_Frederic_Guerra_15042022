import {
	AddAlert,
	AddComment,
	DeleteForever,
	Edit,
	Favorite,
	MoreVert,
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
import jwt_decode from 'jwt-decode';
import UserType from '../../Types/UserType';
import './postCard.css';
import PostUnique from '../postUnique/PostUnique';

import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import moment from 'moment';
import 'moment/locale/fr';

import axios from 'axios';
moment.locale();

interface IProps {
	posts: {
		id: number;
		title: string;
		content: string;
		image: string;
		like: number;
		posted_at: Date;
		is_reported: number;
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

function PostCard({ posts, deletPost }: IProps) {
	return (
		<>
			{posts.map((p) => {
				return <PostUnique post={p} deletPost={deletPost} />;
			})}
		</>
	);
}

export default PostCard;
