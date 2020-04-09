import express from 'express';
import Login_controller from '../controller/login';

const router = express.Router();

router.post('/login', Login_controller.login);

module.exports = router;
