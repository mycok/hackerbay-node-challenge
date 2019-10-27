import { Router } from 'express';

import objectPatch from '../controllers/jsonpatch.controller';
import { authenticate, validateDocumentAndPatchProperties, validateOpsAndPathsParameters } from '../middleware';

const router = Router();

router.route('/api/v1/jsonPatch')
  .patch(
    authenticate,
    validateDocumentAndPatchProperties,
    validateOpsAndPathsParameters,
    objectPatch,
  );

export default router;
