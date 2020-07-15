const router = require('express').Router();
const { auth } = require('../middleware/middleware');
const { userRegister, userLogin,forgetPassword,checkRole } = require('../utils/Auth'); 
const { readUserById } = require('../utils/User'); 
/*
Registration routes
*/
//customer Registration route
router.post('/register', async (req, res) => {
    await userRegister(req.body, res); 
})

/*
Login routes
*/
//can make 3 users to one login api
//Customer Login route
router.post('/login-customer', async (req, res) => {
    await userLogin(req.body, res,'customer');
})

//Admin Login route
router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, res);
})

//Artist Login route
router.post('/login-artist', async (req, res) => {
    await userLogin(req.body, res);
 })

//Common profile route
// Checking purpose 
router.get('/profile',auth,async (req, res) => {
    res.send('all');
 })

//Customer Protected route
router.get('/customer-protected',auth,checkRole(['customer']), async (req, res) => {
    res.send('customer-only');
})

//Admin Protected route
router.get('/admin-protected',auth,checkRole(['admin']), async (req, res) => {
    res.send('admin-only');
})
router.get('/admin-and-customer',auth,checkRole(['customer','admin']), async (req, res) => {
    res.send('admin-and-customer');
})

//Artist Protected route
router.get('/artist-protected', async (req, res) => { 
    res.send('artist-only');
})
//forget password
router.post('/forget-password', async (req, res) => {
    forgetPassword();
    res.send('test');
})
//get user by id
router.get('/:id', auth, async (req, res) => {
    console.log(req.user);
    await readUserById(req, res);
})




module.exports = router;