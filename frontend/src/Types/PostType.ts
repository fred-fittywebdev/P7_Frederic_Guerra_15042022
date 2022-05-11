import UserType from './UserType';

type PostType = {
	id: number;
	title: string;
	content: string;
	image: string;
	like: number;
	posted_at: Date;
	is_reported: boolean;
	comments: Comment[];
	user: UserType;
};

export default PostType;
