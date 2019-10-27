import jwt from 'jsonwebtoken';
import config from '../config';

const { jwtSecret } = config;

const generateToken = (username) => jwt.sign(
  { username },
  jwtSecret,
  { expiresIn: '1d' },
);

export default generateToken;
