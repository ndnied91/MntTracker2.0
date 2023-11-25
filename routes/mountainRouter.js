import { Router } from 'express';
const router = Router();

import { getAllJobs } from '../controllers/mountainController.js';

router.route('/').get(getAllJobs); //we want to update the mountain and save it to the DB

export default router;
