import { Router } from 'express';
const router = Router();

import { updateMountains } from '../controllers/updateController.js';

router.route('/').get(updateMountains);

export default router;
