const router = require('express').Router();
const { auth,checkRole } = require('../middleware/middleware');
const { upload } = require('../utils/Artist'); 
const Artist = require('../models/artist');
//TODO: add to utils add restructure code
//DESC==> ARTIST ADD NEW SERVICE TO LIST 
router.post('/service', auth, checkRole(['artist', 'admin']), upload.single('upload'), async (req, res) => {
    await req.user.populate('specifiedUser').execPopulate();
    const artist = new Artist(
    req.user.specifiedUser
    );
    console.log(artist.Services)
    artist.Services = artist.Services.concat({ serviceName:req.body.serviceName, startPrice: req.body.startPrice,picture: req.file.buffer})
    await artist.save(); 
    res.status(200).json({
        message: 'Service created',
        success: true
    })
})  
//Artist Profile
router.get('/me', auth, checkRole(['artist', 'admin']), async (req, res) => {
    await req.user.populate('specifiedUser').execPopulate();
    //TODO:  *** add artist providing services to profile info *** restructure to utils
    const artist ={
        username:req.user.username,
        name: req.user.name,
        email: req.user.email,
        //TODO: add available time to artist
        availableTime:'6 to 6',
        timeFrequent: req.user.specifiedUser.timeFrequent,     
        }
    res.send(artist)
})




router.post('/questions',auth, async (req, res) => {
    res.send('set');
})
router.get('/profile', auth, checkRole(['artist', 'admin']), async (req, res) => {
    await req.user.populate('specifiedUser').execPopulate();
    res.send(req.user.specifiedUser)
})
module.exports=router