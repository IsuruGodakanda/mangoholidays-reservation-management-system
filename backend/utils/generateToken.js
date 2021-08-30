import jwt from 'jsonwebtoken';

export const generateAuthToken = (obj) => {
  return jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
