const User = require('../models/user');
var ObjectID = require('mongodb').ObjectID; 

//read all users
const readUserById = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(403).json({
                message:'No user found',
                success: false
            });
        }
        return res.status(403).json({
            user,
            success: true
        });

    }
    catch{
        return res.status(403).json({
            success: false
        });
    }
    
    
        
        
        
    
    }
  
        

module.exports = {
    readUserById
}
