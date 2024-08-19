import express from 'express';
import { validateRoute } from '../middleware/validateRoute.js';
import { getMessages, sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.route("/:id").get( validateRoute, getMessages );
router.route("/send/:id").post( validateRoute, sendMessage);

export default router;