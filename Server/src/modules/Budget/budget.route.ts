import express from 'express';
import { GetBudgets, CreateBudget, UpdateBudget, DeleteBudget } from './budget.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';

const router = express.Router();

router.get('/options', GetBudgets);
router.post('/options', checkAdminCookie, CreateBudget);
router.put('/options/:_id', checkAdminCookie, UpdateBudget);
router.delete('/options/:_id', checkAdminCookie, DeleteBudget);

export default router;
