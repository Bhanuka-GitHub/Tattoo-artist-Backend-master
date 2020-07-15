const { Schema, model, Types } = require('mongoose');
// have to add validator
const customerSchema = new Schema({
    profilePic:{
       type:Buffer
   },
    user: {
        type:Types.ObjectId,
        required: true,
        ref:'user'
    }
    
}, { timestamps: true });
module.exports = model('customer', customerSchema);