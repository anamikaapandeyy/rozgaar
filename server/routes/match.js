import { Router } from 'express';
import { matchCareers } from '../controllers/matchController.js';

const router = Router();

router.post('/', matchCareers);

export default router;