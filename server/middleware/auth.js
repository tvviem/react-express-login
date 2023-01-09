/** auth middleware */
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

export default async function Auth(req, res, next) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(' ')[1];

    // retrieve the user details for the logged in user
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    // res.json(decodedToken);
    next(); // forward request object (user)
  } catch (error) {
    res.status(401).json({ error: 'Authentication Failed!' });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false
  };
  next();
}
