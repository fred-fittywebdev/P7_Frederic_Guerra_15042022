import { Role } from './Roles';

export class User {
	constructor(
		public id = 0,
		public first_name = '',
		public last_name = '',
		public username = '',
		public email = '',
		public is_valid = '',
		public is_admin = null,
		public profile_picture = '',
		public role = new Role()
	) {}

	get name() {
		return this.first_name + ' ' + this.last_name;
	}
}
