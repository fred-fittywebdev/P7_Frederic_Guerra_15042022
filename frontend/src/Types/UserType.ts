import RoleType from './RoleType';

type UserType = {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	is_valid: boolean;
	is_admin: number;
	profile_picture: string;
	role: RoleType[];
};

export default UserType;
