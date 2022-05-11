// import { getManager } from 'typeorm';
// import { Request, Response } from 'express';
// import { Role } from '../entity/role.entity';

// export const Roles = async (req: Request, res: Response) => {
//     const repository = getManager().getRepository(Role)

//     res.send(await repository.find())
// }

// // Création d'un rôle
// export const CreateRole = async (req: Request, res: Response) => {
//     const {name, permissions} = req.body

//     // On récupère le repository des rôles
//     const repository = getManager().getRepository(Role)

//     // permissions est un tableau d'ID donc on mappe pour le récupérer
//     const role = await repository.save({
//         name,
//         permissions: permissions.map(id => ({id}))
//     })

//     res.send(role)
// }

// // Récupération d'un role avec son ID et les permissions associées
// export const GetRole = async (req: Request, res: Response) => {
//     const repository = getManager().getRepository(Role)

//     res.status(201).send(await repository.findOne(req.params.id, {relations: ['permissions']})) // On récupère le role avec son ID et les permissions associées
// }

// // Modification du rôles et des permissions
// export const UpdateRole = async (req: Request, res: Response) => {
//     const {name, permissions} = req.body

//     const repository = getManager().getRepository(Role)

//     const role = await repository.save({  // Ici on peut utiliser save() pour un update car on passe l'id, sans celui ci cela crée un post
//         id: parseInt(req.params.id),
//         name,
//         permissions: permissions.map(id => ({id}))
//     })

//     res.status(202).send(role)
// }

// // Supression du rôle
// export const DeleteRole = async (req: Request, res: Response) => {
//     const repository = getManager().getRepository(Role)

//     await repository.delete(req.params.id)

//     res.status(204).send(null)
// }
