import { Router } from 'express';
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';

/** POST method */
router.route('/register').post(controller.register);
router.route('/registeremail').post(registerMail);
router
  .route('/authenticate')
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login);

/** GET method */
router.route('/user/:username').get(controller.getUser); // get user with username
router
  .route('/generateOTP')
  .get(localVariables, controller.verifyUser, controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

/** PUT method */
router.route('/updateUser').put(Auth, controller.updateUser); // update userprofile
router
  .route('/resetPassword')
  .put(controller.verifyUser, controller.resetPassword); // change user' password

export default router;
