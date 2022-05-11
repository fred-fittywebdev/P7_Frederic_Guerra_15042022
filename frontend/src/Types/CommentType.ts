import PostType from './PostType';
import UserType from './UserType';

type CommentType = {
	id: number;
	content: string;
	commented_at: string;
	updated_at: string;
	user_id: UserType;
	post_id: PostType;
};

export default CommentType;
