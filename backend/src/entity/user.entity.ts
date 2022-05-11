// import { Role } from './role.entity';
import { type } from 'os';
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Comments } from './comments.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({
		nullable: true,
		default: 'username',
	})
	username: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	@Column({
		default: true,
	})
	is_valid: boolean;

	@Column({
		default: 0,
	})
	is_admin: number;

	@Column({
		nullable: true,
		default: 'http://localhost:8080/api/uploads/avatar-defaut.png',
	})
	profile_picture: string;

	// @ManyToOne(() => Role) // Ici un utilsateur ne peut avoir qu'un seul role, alors qu'un rôle peut être assigné a plusieurs utilisateurs
	// @JoinColumn({ name: 'role_id' }) // On spécifie comment on veut appeler la colonne
	// role: Role;

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];

	@OneToMany(() => Comments, (comment) => comment.user)
	comments: Comments[];
}
