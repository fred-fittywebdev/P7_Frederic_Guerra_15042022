import { User } from './../entity/user.entity';
import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { getRepository } from 'typeorm';
import { Reset } from '../entity/reset.entity';
import bcryptjs from 'bcryptjs'


export const Forgot = async (req: Request, res: Response) => {
    const {email} = req.body
    const forgot_token = Math.random().toString(20).substring(2, 12)

    await getRepository(Reset).save({
        email, 
        forgot_token
    })

    // Determine le port pour envoyer les emails, ici Mailhog
    const transporter = createTransport({
        host: "0.0.0.0",
        port: 1025
    })

    // Création de l'url que recevra la personne dans le mail, ici 3000 pour React
    const url = `http://localhost:3000/reset/${forgot_token}`

    // Envoi de l'email
    await transporter.sendMail({
        from: 'admin@groupomania.com',
        to: email,
        subject: 'Demande de réinitialisation de votre mot de passe',
        html: `Suivez <a href="${url}">ce lien </a>  pour réinitialiser votre pot de passe`
    })

    res.send({
        message: 'Un lien pour réinitialiser votre mot de passe viens de vous être envoyé sur votre boite mail'
    })
}

// fonction pour changer le mot de passe
export const ResetPassword = async(req: Request, res: Response) => {
    // on envoie dans le mail, le forgot_token, le password et le password_confirm
    const {forgot_token, password, password_confirm} = req.body

    if (password != password_confirm) {
        return res.status(400).send({
            message: "Les mots de passe ne correspondent pas."
        })
    }

    const resetPassword = await getRepository(Reset).findOne({forgot_token})

    if (!resetPassword) {
        return res.status(400).send({
            message: 'L\'url n\'est pas valide.'
        })
    }

    // si c'est bon on récupère l'utilisateur
    const user = await getRepository(User).findOne({email: resetPassword.email})

    if (!user) {
        return res.status(400).send({
            message: "Cet utilisateur n'existe pas."
        })
    }

    // On modifie le mot de passe
    await getRepository(User).update(user.id, {
        password: await bcryptjs.hash(password, 12)
    })

    res.send({
        message: 'Mot de passe réinitialisé avec succes.'
    })
}