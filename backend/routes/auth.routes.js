import express from 'express';
import { signin, signup,  signout} from '../controller/auth.controller.js'
const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').post(signout);

export default router