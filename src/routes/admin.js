const router = require('express').Router();
const { readAllUsers } = require('../utils/Admin'); 
const { auth } = require('../middleware/middleware');

//get all users
router.get('/all-users',auth,async (req, res) => {
   await readAllUsers(req,res)
})
module.exports = router;