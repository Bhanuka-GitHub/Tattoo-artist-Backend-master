const User = require('../models/user');

//read all users
const readAllUsers = async (req, res) => {
   
    try {
        const users = await User.find({});
        return res.status(403).json({
            users,
            success: true
        });
    }
    catch (e) {
        //implement 
        return res.json({
            message: "Sorry Unable to register",
            success:false
        });
    }
}
module.exports = {
    readAllUsers
}
