import { Router } from 'express';

import login from '../controllers/auth.controller';
import {
  userDataSanitizer,
  isUsernameValid,
  isPasswordValid,
} from '../middleware';

const router = Router();

router.route('/api/v1/login')
  .post(userDataSanitizer, isUsernameValid, isPasswordValid, login);

export default router;
