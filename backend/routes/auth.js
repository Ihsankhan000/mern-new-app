const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ihsanmohmand123@$afsd";
const fetchuser = require('../midleware/fetchuser')

// ROUTE 1: create a user using POST "/api/auth/createuser" No Login required
router.post( "/createuser",[
    body("email", "enter a valid email").isEmail(),
    body("name", "name must be atleast 3 characters").isLength({ min: 3 }),
    body("password", "password must be atleast 5 characters").isLength({min: 5,})
  ],async (req, res) => {
    let success = false;
    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //check weather the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400)
          .json({success, error: "sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      
      // create new user
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      //   res.json(user);
      success = true;
      res.json({success, authtoken: authtoken });
      // console.log(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);




//  ROUTE 2:  Authencate a user using POST "/api/auth/login" no Login required
router.post("/login", [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists() ],
    async (req, res) => {
      let success = false;
    // If there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
     let user = await User.findOne({email})
     if(!user){
      success = false;
        return res.status(400).json({success, error:"please try to login with correct credentials"})
     }
     const passwordCompare =await bcrypt.compare(password,user.password);
     if(!passwordCompare){
      success = false ;
        return res.status(400).json({success, error:"please try to login with correct credentials"});
     }
     const data = {
        user: {
          id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true ;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });



  //  ROUTE 3:  Get logedin user Details using POST "/api/auth/getuser" Login required
  // using middleware fetchuser. first run middleware then async function will call.
    router.post("/getuser",fetchuser,async (req, res) => {
      try{
         const userId = req.user.id;
         const user = await User.findById(userId).select("-password");
         res.send(user);
       }catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
       }
      

    });


module.exports = router;
