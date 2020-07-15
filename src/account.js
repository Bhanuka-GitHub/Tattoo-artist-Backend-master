var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amdinshaf@gmail.com',
    pass: 'Stat_127149'
  }
});

var mailOptions = {
  from: 'amdinshaf@gmail.com',
  to: '174006v@uom.lk',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});