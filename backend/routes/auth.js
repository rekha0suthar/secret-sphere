import { Router } from 'express';
import {
  signup,
  login,
  getUser,
  forgetPassword,
  resetPassword,
} from '../controllers/auth.js';
import { verifytoken } from '../middleware/auth.js';
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', verifytoken, getUser);
router.post('/forget-password', forgetPassword);
router.put('/reset-password', resetPassword);

export default router;
