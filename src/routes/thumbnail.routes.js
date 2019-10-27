import { Router } from 'express';

import getResizedThumbnail from '../controllers/thumbnail.controller';
import { authenticate, validateImageDownloadUrl } from '../middleware';

const router = Router();

router.route('/api/v1/thumbnail')
  .post(authenticate, validateImageDownloadUrl, getResizedThumbnail);

export default router;
