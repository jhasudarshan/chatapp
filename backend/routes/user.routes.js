import express from 'express';
import { validateRoute } from '../middleware/validateRoute.js';
import { chatUsers, searchUsers, usersToConnect } from '../controller/user.controller.js';

const router = express.Router();

router.route("/search").get( validateRoute, searchUsers );
router.route("").get(validateRoute,chatUsers);
router.route("/users-to-connect").get( validateRoute, usersToConnect );

export default router;