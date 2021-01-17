import admin from 'firebase-admin'
import { Request, Response, NextFunction } from '../../../utils/controller';

export const authorize = async (req : Request, res : Response, next : NextFunction) => {
  const bearerHeader = req.headers.authorization

  if (!bearerHeader) res.sendStatus(401);

  try {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    const decodedToken = await admin.auth().verifyIdToken(bearerToken)

    req.userId = decodedToken.uid;

    next();
  } catch (ex) {
    res.sendStatus(401);
  }
}
