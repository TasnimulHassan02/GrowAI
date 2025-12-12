import express from 'express';
import { createUser, getUsers, loginUser, getMyProfile} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', protect, getMyProfile);

export default router;