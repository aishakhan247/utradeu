// import moduels
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const cookieParser = require("cookie-parser")
const { default:axios} = require('axios')


//AWS s3 modules needed
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


//File stream and removing unnecessary files
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink);

const seedDB = require('./database/DBSeeder')
require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME


// app
const app = express();
const User = require('./schemas/User')
const {Comment, Post} = require('./schemas/Post')
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))

// db
const connectDB = require('./config/dbConn')
connectDB()

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

//method that gets a file from the S3 bucket (usually an image)
function getFileStream(fileKey)
{
  const downloadParams = 
  {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}

app.get('/uploads/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is 
  // authorized to view this image, then

  const imageName = req.params.imageName

  // console.log("app.js ImageName: ", imageName)
  if(imageName != null && imageName != "undefined" && imageName != "null")
  {
    // console.log("Inside if statement")
    try
    {
    const readStream = getFileStream(imageName)
    readStream.pipe(res)
    }
    catch(e)
    {
      console.log("oopsie")
    }
  }
  
})

app.post("/images", upload.array("demo_image", 4), (req, res) =>{
  try { 
    res.send(req.files);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
});

app.get('/resetDB', async(req,res) =>
{
  seedDB();
  res.send("Okay");
})

app.post("/authenticateAllUsers", async(req,res) => {
  const users = await User.find({}).exec();
  try
  {
    for(let i = 0; i < users.length; i ++)
    {
      axios.post('http://localhost:8080/authenticate', {username: users[i].firstName + " " + users[i].lastName});
    }
    res.send("Authenticated All Users!")
  }
  catch(e)
  {
    console.log(e)
  }
})

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try
  {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: username, first_name: username},
        {headers: {"private-key": "e3edcd6c-bd3d-4793-ad6d-2f900b5bc6e8"}}
    )
    return res.status(r.status).json(r.data)
  } catch(e)
  {
    console.log(e)
    return e
  }
})

//routes

const profileRouter = require('./routes/profile')
app.use("/profile", profileRouter)

const postRouter = require('./routes/post')
app.use("/posts", postRouter)

// port
const port = process.env.PORT | 8080;

// listener
const server = app.listen(port, () =>
  console.log(`server is running on port ${port}`)
);

