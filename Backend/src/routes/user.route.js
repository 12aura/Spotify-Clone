import { Router } from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/',(req, res) =>
{
    req.auth.userId
    res.send('User route with get method');
});

export default router;