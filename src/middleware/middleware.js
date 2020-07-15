const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET } = require('../config');
const auth = async (req, res, next) => {    
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        req.user = user
        next();
    }
    catch (e) {
        res.status(401).send({error:'Please Authenticate'})
    }
}
const checkRole = roles => (req, res, next) => !roles.includes(req.user.role) ? res.status(401).json("Unauthorized") : next();
module.exports={
    auth,
    checkRole
}