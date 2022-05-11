import { Request, Response } from 'express';
import multer from 'multer';

export const Upload = async (req: Request, res: Response) => {
	// condition pour image if
	const storage = multer.diskStorage({
		destination: './uploads',
		filename: (_: Request, file: Express.Multer.File, callback) => {
			const randomName = Math.random().toString(20).substring(2, 12);
			return callback(null, `${randomName}.${file.originalname}`);
		},
	});

	const upload = multer({ storage }).single('image');

	upload(req, res, (err) => {
		if (err) {
			return res.status(400).send(err);
		}

		res.send({
			url: `http://localhost:8080/api/uploads/${req.file.filename}`,
		});
	});
};
