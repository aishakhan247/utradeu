/**
 * This module is a router for the profiles portion of the UtradeU website. The purpose of this route is to
 * allow users to view profiles of themselves or other users. They will also be able to interact with certain portions
 * of a user's profile like their current listings, requests, leave ratings, chat with the user, etc...
 *
 *
 * @link   URL
 * @file   This files defines the profile.js class.
 * @author Jacob Day
 * @since  x.x.x
 */

//Set up the required modules
const express = require("express");
const mongoose = require("mongoose");
const User = require("../schemas/User");
const connectDB = require("../config/dbConn");
const multer = require("multer");
const upload = multer({ dest: '../uploads/' })
// const upload = multer();

//AWS s3 modules needed
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const { default: axios } = require('axios')


//File stream and removing unnecessary files
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink);

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME

const jwt = require("jsonwebtoken");
const { sendVerification } = require("../utils/sendVerification")

// Modules for securely storing account information and validating accounts
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const validator = require("validator");
const { userInfo } = require("os");
// const cognito = require("aws-sdk/cognito-identity")
// import { CognitoIdentity } from "aws-sdk/cognito-identity";

//establish connection to the database
const router = express.Router();


function getFileStream(fileKey) {
  const downloadParams =
  {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}


function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise();
}

router.get("/profileImage/:imageName", async (req, res) => {

  // do a bunch of if statements to make sure the user is 
  // authorized to view this image, then

  const imageName = req.params.imageName

  console.log("Image Name: ", imageName)

  if (imageName != "undefined") {

    const readStream = getFileStream(imageName)
    readStream.pipe(res)
  }

})

// Create an SMTP object for email authentication
router.get("/verify?:emailToken", async (req, res) => {
  console.log("Made it to verification!")

  const token = req.query.emailToken;

  if (!token) {
    res.send("No token located.");
  }

  const user = await User.findOne({ emailToken: token });

  if (user) {
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    res.send("User has been verified");
  } else {
    res.send("Unable to locate given token");
  }
});


router.post("/register", async (req, res) => {
  // Grab the required information
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;
  const pword = req.body.password;

  console.log(
    "Received User: " +
    fName +
    " " +
    lName +
    " from " +
    email +
    " with password " +
    pword
  );
  try {
    // Verify all information is present
    if (!fName || !lName || !email || !pword) {
      res
        .status(400)
        .send(
          "All fields are required.\nFirstname LastName: " +
          fName +
          " " +
          lName +
          "\nemail: " +
          email
        );
      return;
    }

    // Verify the email is a valid University of Utah domain (ends with utah.edu)
    if (!email.endsWith("utah.edu") || !validator.isEmail(email)) {
      res
        .status(400)
        .send("Email must be a valid University of Utah email address.");
      return;
    }

    // Attempt to see if this email already exists within the database
    var user = await User.findOne({ email: email }).exec();
    if (user) {
      res.status(400).send("Account with this email already exists.");
      return;
    }

    const salt = await bcrypt.genSalt();
    const seasonedPassword = await bcrypt.hash(pword, salt);

    console.log("Creating new user ... ");
    // Create a new account if the email is not used in the DB and ends with utah.edu
    user = await User.create({
      firstName: fName,
      lastName: lName,
      email: email,
      emailToken: crypto.randomBytes(64).toString("hex"),
      password: seasonedPassword,
      uID: req.body.uID,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
      major: req.body.major,
      services: req.body.services,
    });
    // Send the verification email
    sendVerification(user);
    res.send("Verification email sent!");
  } catch (error) {
    console.log("Ran into a whoopsie", error);
    res.send(error);
  }

});

router.post("/login", async (req, res) => {
  console.log("in login")
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("No email found")
      res.status(400).send("Email not found");
      return;
    }

    // console.log("backend user: ", user)
    const match = await bcrypt.compare(password, user.password);
    const verfiedEmail = user.isVerified;
    if (match & verfiedEmail) {
      try {
        console.log("Before authenticating for chatengine")
        const r = await axios.post(
        serverHost + '/authenticate', { username: user.firstName + " " + user.lastName })
        console.log("after authenticating for chatengine.io")
      }
      catch (e) {
        console.log(e);
      }
      jwt.sign(
        { user },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ user, token });
        }
      );
    } else if (!match) {
      res.status(400).send("Password does not match");
      return;
    } else if (!verfiedEmail) {
      // send the email here
      res.status(400).send("Please check your email for verification link");
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

//what is going to show when nothing follows /profile in the URL
router.get("/userProfile", async (req, res) => {
  const token = req.header("Authorization").split(" ")[1]; // Get the token from the request header
  if (!token) {
    return res.status(401).send("No token provided"); // Unauthorized if no token is provided
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Token has expired
          return res.status(401).send("Token expired");
        } else {
          // Other JWT verification errors
          return res.status(401).send("Token invalid");
        }
      }
      const updatedUser = await User.findById(user.user._id).exec();
      user.user = updatedUser;
      res.send(user);
    });
  } else {
    res.status(400).send("no token");
  }
});

// app.post("/logout", (req, res) => {
//   res.status(200).send("Logged out successfully");
// });

//what is going to show when nothing follows /profile in the URL
router.get("/", async (req, res) => {
  res.send("I am a stegosaurus");
});

//get a specific user with the Firstname after /profile in the URL (example: /profile/Jacob will get the profile for Jacob)
//will have to discuss with Nasser how we want to view a specific profile, possibly by uID???
// router.get("/:firstName", async (req, res) => {
//   //this method needs to be async because the findOne() method returns a query and we need the result back before we can move on
//   const user = await User.findOne({ firstName: req.params.firstName }).exec();
//   res.send(JSON.stringify(user));
// });


router.get("/:userId", async (req, res) => {
  //this method needs to be async because the findOne() method returns a query and we need the result back before we can move on
  try {
    const user = await User.findById(req.params.userId).exec();
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error finding the user");
  }
});

router.get("/myprofile/:userId", async (req, res) => {
  //this method needs to be async because the findOne() method returns a query and we need the result back before we can move on
  try {
    const user = await User.findById(req.params.userId).exec();
    // console.log("User: ", user)
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error finding the user");
  }
});


//create a new user
router.post("/createUser", upload.none(), async (req, res) => {
  //postman refuses to work with this for some reason, will need to test it when Nasser is done with his part
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    uID: req.body.uID,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    bio: req.body.bio,
    major: req.body.major,
    services: req.body.services,
  });

  // console.log(user);

  // user.save();

  res.send("Okay");
});

// router.post("/register", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   if (!email || !password) {
//     res.status(400).send("Email or password missing!");
//   }

//   if (email.stringify.endsWith("utah.edu")) {
//     res.status(400).send("Must use a University of Utah email");
//   }
// });

router.post("/userData", upload.single("demo_image"), async (req, res) => {

  const userData = JSON.parse(req.body.profileData);

  // console.log(userData)

  const ourFile = req.file

  var pictureURL = null

  if (ourFile != null) {
    const result = await uploadFile(ourFile)

    pictureURL = ourFile.filename

    await unlinkFile(ourFile.path)
  }

  updateUser(userData, pictureURL);

});

async function updateUser(userData, pictureURL) {
  //not everything here should be able to be updated, but this will do for now
  // const user = await User.findOne({ firstName: userData.firstName }).exec();
  const user = await User.findById(userData._id).exec();

  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.uID = userData.uID;
  user.phoneNumber = userData.phoneNumber;
  user.email = userData.email;
  user.bio = userData.bio;
  user.major = userData.major;
  user.services = userData.services;
  user.profilePictureURL = pictureURL;

  user.save();

  // maybe send user back to frontend
}

//export this router so other modules can use it
module.exports = router;
