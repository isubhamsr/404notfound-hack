const route = require('express').Router()
const auth = require('../controllers/auth')

route.post('/signup',auth.signup)
route.post('/signin',auth.signin)
// route.post('/ownersignin',auth.ownerSignin)
route.get('/logout/:id', auth.logout)
route.get('/verifytoken/:id', auth.verifyUserToken)
route.get('/emailverify', auth.emailVerify)
route.post('/forgetpassword', auth.sendForgetPasswordLink)
route.put('/resetpassword', auth.resetPassword)

module.exports = route