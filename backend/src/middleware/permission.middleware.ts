// import {  Request, Response } from 'express';
// import { nextTick } from 'process';
// import { User } from '../entity/user.entity';

// export const PermissionMiddleware =  (access: string) => { // Permet de passer en paramètre le nom du rôle pour restreindre la route
//     return (req: Request, res: Response, next: Function) => {
//     const user: User = req['user']

//     const permissions = user.role.permissions

//     // On a des permissions avec edit et view, view donne accès au route get, edit aux routes get et post
//     if (req.method === 'GET') {
//         if (!permissions.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`))) { // ici on cherche si l'une de ces phrases est présente dans le tableau permissions
//             return res.status(401).send({
//                 message: 'Vous n\'avez pas accès a ces informations'
//             })
//         }
//     } else {
//         if (!permissions.some(p => (p.name === `edit_${access}`))) {
//             return res.status(401).send({
//                 message: 'Vous n\'avez pas accès a ces informations'
//             })
//         }
//     }

//     next()
//     }
// }
