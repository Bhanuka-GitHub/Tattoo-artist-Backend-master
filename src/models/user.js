const { Schema, model, Types } = require('mongoose');
// have to add validator
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "admin", "artist"]
         
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }],
    isConfirmed: {
        type: Boolean,
        default:false
    },
    specifiedUser: {
        type: Types.ObjectId,
        required:true,
        ref:'artist'
    }

    
}, { timestamps: true });
module.exports = model('user', UserSchema);