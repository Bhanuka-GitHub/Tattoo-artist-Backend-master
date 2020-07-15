const User = require('../models/user');
const Artist = require('../models/artist');
const Customer = require('../models/customer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { SECRET, SENDGRID } = require('../config');

const { ObjectId } = require('mongodb');


//register any user
//REVIEW

const userRegister = async (userDets, res) => {
    try {
      //validate the user
      let usernameNotTaken = await (validateUsername(userDets.username));
      //validate the email
      let emailNotRegistered = await (validateEmail(userDets.email));
      if (!usernameNotTaken) {
          return res.status(400).json({
              message: `Username already taken`,
              success: false
          });
      }
      if (!emailNotRegistered) {
          return res.status(400).json({
              message: `Email already Registered`,
              success: false
          });
      }
      //hash password (hashing with 12 rounds)
        const hashedPassword = await bcrypt.hash(userDets.password, 12);
      //create userId and add to user and relevant user table
        const id = new ObjectId();  
        const specifiedUser = new ObjectId();  
      //create new user
        const newUser = new User({
            _id: id,
            specifiedUser,
          ...userDets,
          password: hashedPassword,         
      });
        let token = await (createWebToken(newUser, '7 days'));
        newUser.tokens = newUser.tokens.concat({ token });
        await newUser.save();
        if (userDets.role == "artist") {
            const newArtist = new Artist({_id:specifiedUser,user:id})
            await newArtist.save();
        }
        if(userDets.role=="customer") {
            const newCustomer = new Customer({_id:specifiedUser,user:id})
            await newCustomer.save();
        }
      //IMPROVE RETURN
        //TODO: not show all thing
        return res.status(201).json({
            newUser,
            token
            ,message: "Your Are Fully Registered login in now",
            success:true
        });
    }
    catch (e) {
        //implement 
        return res.status(500).json({
            error:e,
            message: "Sorry Unable to register",
            success:false
        });
    }
};
//User login (all)
const userLogin = async (userCredential,res,role) => {
    let { username, password } = userCredential;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "User is not found,Invalid login Credentials",
            success: false
        })
    }
        //user found ==>
        //check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            //sign in the token and issue it to user
            let token = await (createWebToken(user, '7 days'));
            user.tokens = user.tokens.concat({ token });
            await user.save();
            let result = {
                username: user.username,
                role: user.role,
                email: user.email,
                tokens:user.tokens,
                token:`Bearer ${token}`,
                expiresIn: 168
            };
            return res.status(403).json({
                ...result,
                message: "Welcome! Your logged in",
                success: true
            });
        }
        //password don't match
        else {
            return res.status(403).json({
                message: "incorrect Password",
                success: false
            })
            
        }
        
    
    
}
//forget password
const forgetPassword = () => {
    console.log('hit')
    sendEmail();
}

const checkRole = roles => (req, res, next) => !roles.includes(req.user.role) ? res.status(401).json("Unauthorized") : next();

const validateUsername = async (username) => {
    let user = await User.findOne({ username });
    return user ? false : true;
};
const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};
const createWebToken = async (userObject, validPeriod) => {
    return await jwt.sign({
        _id:userObject._id
    }, SECRET, { expiresIn: validPeriod });
}
const sendEmail = async() => {
    sgMail.setApiKey("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");
    const msg = {
    to: 'amdinshaf@gmail.com',
    from: 'amdinshaf@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    await sgMail.send(msg);
}



module.exports = {
    userRegister,
    userLogin,
    forgetPassword,
    checkRole
}
