import { Router } from 'express';
import { verifytoken } from '../middleware/auth.js';
import {
  getSecrets,
  addSecret,
  deleteSecret,
  getUserSecret,
  updateSecret,
} from '../controllers/secrets.js';

const router = Router();

router.post('/', verifytoken, addSecret);
router.get('/', verifytoken, getSecrets);
router.delete('/:id', verifytoken, deleteSecret);
router.get('/:id', verifytoken, getUserSecret);
router.put('/:id', verifytoken, updateSecret);

export default router;
