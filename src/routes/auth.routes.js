const router = require('express-promise-router')();
const authController = require('../controllers/auth.controllers');


router.post('/login', authController.login);
router.post('/logout', authController.logoutAuth);
router.get('/active', authController.activeAuth);

module.exports = router;