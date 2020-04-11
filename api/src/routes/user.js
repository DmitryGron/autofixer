import express from 'express';
import login from '../controller/login';
import register from '../controller/register';
const router = express.Router();

router.post('/user', register.create);
router.get('/users', register.find);
router.get('/user/:id', register.findOne);
router.post('/login', login);

module.exports = router;
