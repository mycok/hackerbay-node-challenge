import { Router } from 'express';

import objectPatch from '../controllers/jsonpatch.controller';
import {
  authenticate,
  isPatchDocumentValid,
  isPatchArrayValid,
  isOpValid,
  isPathValid,
} from '../middleware';

const router = Router();

router.route('/api/v1/jsonPatch')
  .patch(
    authenticate,
    isPatchDocumentValid,
    isPatchArrayValid,
    isOpValid,
    isPathValid,
    objectPatch,
  );

export default router;
