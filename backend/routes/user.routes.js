import express from 'express';
import { validateRoute } from '../middleware/validateRoute.js';
import { chatUsers, searchUsers } from '../controller/user.controller.js';

const router = express.Router();

router.route("").get( validateRoute, searchUsers );
router.route("/search").get( validateRoute, searchUsers );

export default router;