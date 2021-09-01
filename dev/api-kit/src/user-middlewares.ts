import { Response, NextFunction } from 'express';
import { RequestWithUser } from './types';

function populateUser(req: RequestWithUser, res: Response, _: NextFunction) {
	try {
		req.user = req.headers.user ? JSON.parse(req.headers.user) : null;
	} catch (e) {
		res.status(400).json({ code: 'INVALID_USER' }).end();
	}
}

function verifyUser(req: RequestWithUser, res: Response, next: NextFunction) {
	if (req.user) {
		next();
	} else {
		res.status(401).end();
	}
}

export default {
	populateUser,
	verifyUser,
};
