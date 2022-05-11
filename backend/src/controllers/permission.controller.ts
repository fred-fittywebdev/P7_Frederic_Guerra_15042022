import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import { Permission } from '../entity/permission.entity';


export const Permissions = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Permission)

    res.send(await repository.find())
}