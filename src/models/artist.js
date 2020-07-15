const { Schema, model, Mongoose, Types } = require('mongoose');
// TODO:have to add validator
const artistServiceSchema = new Schema({
    serviceName: {
        type: String,
    },
    startPrice: {
        type: Number,    
    },
    
    picture: {
        type: Buffer,   
    },
    description: {
        type:String
    }
})
const artistSchema = new Schema({
    timeFrequent: {
        type: Number,
        default:2
    },
    user: {
        type:Types.ObjectId,
        required: true,
        ref:'user'
    }
    ,
    Services: [artistServiceSchema],
    availableTime: {
        type:String
    }
    
}, { timestamps: true });
artistSchema.pre('save', function (next) {
    if (this.isNew && 0 === this.Services.length) {
        this.Services = undefined;                                                                                                                                   
      }
      next();
    
})

module.exports = model('artist', artistSchema);