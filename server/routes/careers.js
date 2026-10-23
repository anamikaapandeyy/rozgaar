import { Router } from 'express';
import { getCareers, getCareerBySlug } from '../controllers/careerController.js';

const router = Router();

router.get('/', getCareers);
router.get('/:slug', getCareerBySlug);

export default router;