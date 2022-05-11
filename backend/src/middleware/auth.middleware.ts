import { User } from './../entity/user.entity';
import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { getManager } from 'typeorm';

export const AuthMiddleware = async (
	req: Request,
	res: Response,
	next: Function
) => {
	try {
		const jwt = req.header('Authorization').split(' ')[1];

		const payload: any = verify(jwt, process.env.SECRET_TOKEN); // On vérifie le cookie récupéré pour l'utiliser ensuite si il n'ya rien on met une

		if (!payload) {
			return res.status(401).send({
				message: 'Accès non autorisé.',
			});
		}

		const repository = getManager().getRepository(User);
		// on passe le user directement dans la requête
		req['user'] = await repository.findOne(payload.id); // Permet de faire le lien avec le permission middleware

		next();
	} catch (e) {
		return res.status(401).send({
			message: 'Accès non autorisé.',
		});
	}
};
