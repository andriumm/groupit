var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var models = require("../models");
require("dotenv").config();
var bcrypt = require("bcrypt"); 
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;
const nodemailer = require("nodemailer");


router.post('/', async function(req, res) {
    console.log("Reset password - send email endpoint")
    const { email } = req.body;
    console.log(email)
  
    try{
    const user = await models.Users.findOne({
      where: {
        email,
      },
    });
  
    if(!user){
      throw new Error("Cannot find email address")
    } else {
      const payload = {
        id: user.id,
        email: user.email
      }
    
      const secret = `${user.password}-${user.createdAt.getTime()}`;
    
      const token = jwt.sign({payload}, secret); //example says encode() but that doesn't work
      console.log(token)
    
      const content = '<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>'
      const result = await sendEmail(email, content);
    
      res.send(result)
    }
  } catch (error) {
    res.status(401).send({ message: error.message})
  }
    res.end();
  })
  
  
  router.get('/:id/:token', async function(req, res) { 
    console.log("Reset password - verify token endpoint")
  
    const { id, token } = req.params;
    try{
      const user = await models.Users.findOne({
        where: {
          id,
        },
      });
      if(!user){
        throw new Error( "User not found. Can't reset password")
      } else {
        const secret = `${user.password}-${user.createdAt.getTime()}`;
        const payload = jwt.decode(token, secret);
        console.log(payload) //this corresponds to the payload object in the /resetpassword endpoint
  
        if(!payload){
          throw new Error("Incorrect token. Not allowed to reset password")
        } else {
          res.status(200).send({message: "correct token"})
        }
      }
    } catch (error) {
      res.status(401).send(error.message)
    }
  })
  
  router.post('/:id/:token/update', async function(req, res) {
    console.log("Reset password - update password endpoint")

    const { password } = req.body;
    const { id, token } = req.params;

    try{
      const user = await models.Users.findOne({
        where: {
          id,
        },
      });

      if(!user){
        throw new Error( "User not found. Can't reset password")
      } else {
        const secret = `${user.password}-${user.createdAt.getTime()}`;
        const payload = jwt.decode(token, secret);
  
        if(!payload){
          throw new Error("Incorrect token. Not allowed to reset password")
        } else {
            await models.Users.update(
              { password },
              {
                where: {
                  id,
                }
              });      
            res.send({ message : "Password updated successfully. "})          
        }
      }
    } catch (error) {
      res.status(401).send(error.message)
    }
  })
  
  
  const sendEmail = async (email, content) => {
    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
      sendmail: true, // doesn't work without this line, why?
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    const mailOptions = {
      from: `GroupIT`,
      to: `${email}`,
      subject: `REset your password`,
      text: `${content}`,
    }
  
    //async 
    return transporter.sendMail(mailOptions) //result is a promise
  }
  
  module.exports = router;