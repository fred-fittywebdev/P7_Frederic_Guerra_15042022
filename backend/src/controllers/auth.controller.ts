import { AuthMiddleware } from './../middleware/auth.middleware';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';
import { RegistrationValidation } from '../validation/registration.validation';
import bcryptjs from 'bcryptjs';
import { JsonWebTokenError, sign, verify } from 'jsonwebtoken';

// Validate infos on registration with express-validate
export const Register = async (req: Request, res: Response) => {
	const body = req.body;

	const { error } = RegistrationValidation.validate(body);
	if (error) {
		return res.status(400).send(error.details);
	}

	if (body.password != body.password_confirm) {
		return res.status(400).send({
			message: 'Les mots de passe ne correspondent pas.',
		});
	}

	const repository = getManager().getRepository(User);

	const { password, ...user } = await repository.save({
		// on déconstruit l'objet User pour enlever le passwor avec le spread operator
		first_name: body.first_name,
		last_name: body.last_name,
		email: body.email,
		profil_pictire: body.profil_picture,
		password: await bcryptjs.hash(body.password, 12),
		is_valid: body.is_valid,
	});

	res.send(user);
};

export const Login = async (req: Request, res: Response) => {
	// On récupère le repository user
	const repository = getManager().getRepository(User);

	// On trouve le premier user dont l'email correspond au contenu de la requête
	const user = await repository.findOne({ email: req.body.email });

	if (!user) {
		return res.status(404).send({
			message: `identifiants erronés.`,
		});
	}

	if (!user.is_valid) {
		return res.status(400).send({
			message:
				'Vous avez été temporairement bloqué par le modérateur du site',
		});
	}

	if (!(await bcryptjs.compare(req.body.password, user.password))) {
		return res.status(400).send({
			message: 'Identifiants erronés',
		});
	}

	const token = sign(
		{
			id: user.id,
			valid: user.is_valid,
			first_name: user.first_name,
			picture: user.profile_picture,
			user: user,
		},
		process.env.SECRET_TOKEN,
		{ expiresIn: '1h' }
	);

	// res.cookie('auth', token, {
	//     httpOnly: true, // Permet de rendre le token innaccessible au font endd
	//     maxAge: 24 * 60 *60 * 1000 // 1 jour
	// })

	// const {password, ...data} = user

	res.send({
		user,
		token,
		message: 'success',
	});
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
	// Nous récupérons le user dans la requête grâce au AuthMiddleware
	const { password, ...user } = req['user'];
	res.send(user);
};

export const Logout = async (req: Request, res: Response) => {
	res.cookie('jwt', '', { maxAge: 0 }); // Pour enlever le cookie nous mettons un contenu vide dans celui que nous avons déjà créer lors de l'autentification
	res.send({
		success: true,
		message: 'Déconnexion résussie.',
	});
};

export const UpdateInfo = async (req: Request, res: Response) => {
	const user = req['user'];

	const repository = getManager().getRepository(User);

	await repository.update(user.id, req.body);

	const { password, ...data } = await repository.findOne(user.id);

	res.send(data);
};

export const UpdatePassword = async (req: Request, res: Response) => {
	const user = req['user'];

	if (req.body.password != req.body.password_confirm) {
		return res.status(400).send({
			message: 'Les mots de passe ne correspondent pas.',
		});
	}

	const repository = getManager().getRepository(User);

	await repository.update(user.id, {
		password: await bcryptjs.hash(req.body.password, 12),
	});

	const { password, ...data } = user;

	res.send(data);
};
