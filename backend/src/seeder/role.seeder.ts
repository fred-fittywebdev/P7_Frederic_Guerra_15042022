// import { Role } from './../entity/role.entity';
// import { Permission } from './../entity/permission.entity';
// import { createConnection, getManager, getRepository } from 'typeorm';

// createConnection().then(async connection => {
//     // On crée ici les droits et on les push dans le tableau donc dans la table permsissions
//     const permissionRepository = getManager().getRepository(Permission)

//     const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_posts', 'edit_posts', 'view_comments', 'edit_comments','view-tickets', 'edit-tickets']

//     let permissions = []

//     for (let i = 0; i < perms.length; i++) {
//         permissions.push(await permissionRepository.save({
//             name: perms[i]
//         }))
//     }
//     // Ici on crée les différents rôles pour la table rôles
//     const roleRepository = getManager().getRepository(Role)

//     delete permissions[8]  // Permet de supprimer du tableau le droit d'éditer les rôles
//     delete permissions[9]

//     await roleRepository.save({
//         name: 'Admin',
//         permissions // Tout le tableau, toutes les permissions
//     })

//     delete permissions[2]  // Permet de supprimer du tableau le droit d'éditer les rôles
//     delete permissions[3]

//     await roleRepository.save({
//         name: 'Membres',
//         permissions
//     })

//     delete permissions[0]
//     delete permissions[1]

//     await roleRepository.save({
//         name: 'Moderateur',
//         permissions
//     })

//     process.exit(0) // La commande d'insertions stoppe toute seule
// })
