/**
 * 
 * This module is a router for the posts section of UtradeU. This route will display the information 
 * needed for displaying a post. 
 * 
 * 
 * @version 1.0.0
 * @author  Cameron Hanney
 * 
 */

// Set up therequired modules
const express = require('express')
const { Post, Comment } = require('../schemas/Post')
const User = require('../schemas/User')
const { sendReport } = require("../utils/sendReport")

// Create indexes to search by 
Post.createIndexes({ description: "text" }, { categories: "text" })



const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require("dotenv").config();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }

})

//File stream and removing unnecessary files
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink);

//AWS s3 modules needed
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKET_NAME

const router = express.Router()

// Create indexes to search by 
Post.createIndexes({ description: "text" }, { categories: "text" })

//S3 bucket methods

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise();
}

// Call database checker every minute
setInterval(async function checkAuctions() {
  const currentTime = Date.now()
  const currentDate = new Date(currentTime)
  console.log("current time: " + currentDate)
  const auctions = await Post.find({
    $and: [{ postType: "auction" }, { auctionStatus: true }, { auctionEnd: { $lte: new Date(currentDate.toISOString()) } }]
  }).exec()

  for (const post of auctions) {
    post.auctionStatus = false;
    post.save();
  }

  console.log("Items: " + JSON.stringify(auctions))
}, 60000)


router.get("/post/:postId", async (req, res) => {
  //this method needs to be async because the findOne() method returns a query and we need the result back before we can move on
  try {
    const post = await Post.findById(req.params.postId)
      .populate("user")
      .populate({ path: "comments", model: "Comment" })
      .exec();
    if (post) {
      res.send(JSON.stringify(post));
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Error finding the post");
  }
});

/********************  HTTP REQUEST METHODS  *********************/

/**
 * /posts/report
 * Send email for reported posts
 */
router.post('/report', async (req, res) => {
  const postID = req.body.postId
  const reason = req.body.reason


  sendReport(postID, reason)
  res.send("Post Reported")
})


/* 
 * /posts/
 * Get request for acquiring posts and comments
 */
router.get('/', async (req, res) => {
  const post = await Post.find({
    $or: [{ postType: "item" }, { postType: "event" }, { postType: "service" }, { auctionStatus: true }]
  })
    .populate("user")
    .populate("auctionParticipants")
    .populate({ path: "comments", model: "Comment" })
    .exec();
  res.send(JSON.stringify(post))
})

/**
 * /page/
 * Get pages
 */
router.get('/page/:page', async (req, res) => {

  const page = req.params.page;
  PAGE_COUNT = 10;
  const skip = page * PAGE_COUNT;

  console.log("Requesting page: " + page);

  const post = await Post.find({
    $or: [{ postType: "item" }, { postType: "event" }, { postType: "service" }, { auctionStatus: true }]
  })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(PAGE_COUNT)
    .populate("user")
    .populate({ path: "comments", model: "Comment" })
    .exec();
  res.send(JSON.stringify(post.reverse()))
})

/**
 * /page/
 * Get page count
 */
router.get('/pages', async (req, res) => {
  console.log("Requesting pages");

  const post = await Post.count();
  const postCount = parseInt(post / 10);
  res.send(JSON.stringify(postCount));
})

//Get all auction items. 
router.get('/auctions', async (req, res) => {
  const post = await Post.find({ auctionStatus: true })
    .populate("user")
    .populate("auctionParticipants")
    .populate({ path: "comments", model: "Comment" })
    .exec();
  res.send(JSON.stringify(post))
})

//Place a bid for an auciton item. Frontend should provide user and post as ID's, and bidAmt as an int. 
router.post('/placeBid', async (req, res) => {

  const user = req.body.userID
  const post = req.body.postID
  const bidAmt = req.body.price

  console.log("here is the post: " + bidAmt)
  console.log("here is the post: " + user)
  console.log("here is the post: " + post)
  const auction = await Post.findOne({ _id: post });

  console.log("auction: " + auction)

  // Make sure that the bid that came through is a number
  if (isNaN(bidAmt)) {
    res.send("Bid must be a valid number")
    return
  }

  if (auction) {
    console.log("post found. Bidamt: " + bidAmt + " auction price: " + auction.price)
    if (parseInt(bidAmt) > parseInt(auction.price)) {
      console.log("Placing bid")
      auction.price = bidAmt;
      auction.auctionParticipants.push(user);
      auction.auctionBids.push(bidAmt)

      if (auction.auctionParticipants.length > 5) {
        console.log("List exceeding five. Adjusting list")
        auction.auctionParticipants.shift();
        auction.auctionBids.shift();
      }

      console.log("Saving new bid")
      auction.save();
      res.send(JSON.stringify(auction))
    }
  }
  else {
    res.send("Cannot find this post")
  }
})

/* 
 * /posts/createPost/
 * Creates a new post
 */
router.post('/createPost', upload.array("demo_image", 10), async (req, res) => {
  const postData = JSON.parse(req.body.postData);
  const ourFiles = req.files;

  //make sure to check the files to be actual pictures

  var filenames = []

  if (ourFiles != null) {
    for (var i = 0; i < ourFiles.length; i++) {
      const ourFile = ourFiles[i];

      const result = await uploadFile(ourFile)

      filenames.push(ourFile.filename);

      await unlinkFile(ourFile.path)

    }
  }

  console.log(filenames)

  const users = await User.find({}).exec();
  const posts = await Post.find({}).exec();

  const postType = postData.postType ? postData.postType : "item"

  // Assign the post as an auction item if selected
  if (postData.postType == "auction") {
    const newPost = await Post.create({
      user: postData.user,
      postTitle: postData.postTitle,
      description: postData.description,
      pictureURL: filenames,
      postType: postType,
      category: postData.category ? postData.category : "other",
      payRate: postData.payRate,
      quality: postData.quality ? postData.quality : "fair",
      year: postData.year,
      location: postData.location,
      date: postData.date,
      auctionItem: postData.auctionItem,
      auctionEnd: postData.auctionEnd,
      startingBid: postData.startingBid,
      price: postData.startingBid,
      auctionStatus: true,
    });
  }

  else {
    //sequentially assign which user is sending the post
    const newPost = await Post.create({
      user: postData.user,
      postTitle: postData.postTitle,
      description: postData.description,
      pictureURL: filenames,
      postType: postType,
      category: postData.category ? postData.category : "other",
      price: postData.price,
      payRate: postData.payRate,
      quality: postData.quality ? postData.quality : "fair",
      year: postData.year,
      location: postData.location,
      date: postData.date,
    });
  }


  res.send("Done!")
})

// Delete a post by ID
router.delete('/deletePost/:postId', async (req, res) => {
  const postId = req.params.postId;
  try {
    // Find the post by ID and delete it
    const deletedPost = await Post.findByIdAndRemove(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    // delete associated images from s3 bucket if necessary

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});




/* 
 * /posts/search?
 * returns posts with a matching description
 */
router.get('/search?:description', async (req, res) => {
  const rawQuery = req.query.description

  // For empty searches
  if (!rawQuery) {
    const post = await Post.find({
      $or: [{ postType: "item" }, { postType: "event" }, { postType: "service" }, { auctionStatus: true }]
    })
      .populate("user")
      .populate("auctionParticipants")
      .populate({ path: "comments", model: "Comment" })
      .exec();
    res.send(JSON.stringify(post))
    return
  }

  if (!rawQuery.trim()) {
    const post = await Post.find({
      $or: [{ postType: "item" }, { postType: "event" }, { postType: "service" }, { auctionStatus: true }]
    })
      .populate("user")
      .populate("auctionParticipants")
      .populate({ path: "comments", model: "Comment" })
      .exec();
    res.send(JSON.stringify(post))
    return
  }

  else {
    // Search the regular expression to find this in the description.        
    var query = rawQuery.replace(" ", "/|/")
    res.send(JSON.stringify(await Post.find({ $text: { $search: "/" + query + "/" } }).populate('comments').populate('user')))
  }
})

router.get('/filter?', async (req, res) => {
  const TYPES = ["item", "service", "event"]
  const CONDITIONS = ["new", "good", "fair"]
  const YEARS = ["freshman", "sophomore", "junior", "senior", "alum"]
  const PRICES = ["0-25", "25-50", "50-75", "75-100", "100-200"]

  // Create conditions for the query
  var categories = new Array()
  var conditions = new Array()
  var prices = new Array()
  var years = new Array()
  var date;
  var type = "item"

  // Grab the filters
  var filters = req.query.filters ? req.query.filters : new Array();

  // if (!filters) {
  //   filters = new Array()
  // }

  // Add filters from query into the database query
  for (const filter of filters) {

    console.log("filter: " + filter)
    if (CONDITIONS.indexOf(filter) > -1) {
      conditions.push(filter)
    }
    else if (TYPES.indexOf(filter) > -1) {
      type = filter
    }
    else if (YEARS.indexOf(filter) > -1) {
      years.push(filter)
    }
    else if (PRICES.indexOf(filter) > -1) {
      var range = filter.split("-")
      prices.push(range[0])
      prices.push(range[1])
    }
    else if (Date.parse(filter)) {
      date = filter
    }
    else {
      categories.push(filter)
    }
  }

  if (conditions.length == 0) {
    conditions = Array.from(CONDITIONS)
  }

  console.log("what type is it " + type)
  if (type == "item") {
    // If there is no price specified, do not filter on price
    if (prices.length == 0) {
      console.log("categories: " + categories)

      if (categories.length > 0 && conditions.length > 0) {
        const final = await Post.find(
          { $and: [{ postType: type }, { category: categories }, { quality: conditions }] }
        ).populate("user")
          .populate("auctionParticipants")
          .populate({ path: "comments", model: "Comment" })
          .exec();
        res.send(JSON.stringify(final))
      }

      else if (categories.length > 0 && conditions.length <= 0) {
        const final = await Post.find(
          { $and: [{ postType: type }, { category: categories }] }
        ).populate("user")
          .populate("auctionParticipants")
          .populate({ path: "comments", model: "Comment" })
          .exec();
        res.send(JSON.stringify(final))
      }

      else if (categories.length <= 0 && conditions.length > 0) {
        const final = await Post.find(
          { $and: [{ postType: type }, { quality: conditions }] }
        ).populate("user")
          .populate("auctionParticipants")
          .populate({ path: "comments", model: "Comment" })
          .exec();
        res.send(JSON.stringify(final))
      }

      else {
        const final = await Post.find(
          { postType: type }
        ).populate("user")
          .populate("auctionParticipants")
          .populate({ path: "comments", model: "Comment" })
          .exec();
        res.send(JSON.stringify(final))
      }
      return
    }

    prices.sort()
    // Search the database and send
    const final = await Post.find({
      $and: [{ postType: type }, { category: categories }, { quality: conditions }, {
        price: {
          $and: [{ $gt: prices.at(0) }, { $lt: prices.at(prices.length - 1) }]
        }
      }]
    }).populate('user').populate('comments').exec()
    console.log(final)
    res.send(JSON.stringify(final))
    return
  }

  else if (type == "service") {
    // If there is no price specified, do not filter on price
    if (prices.length == 0) {
      console.log("categories: " + categories)

      if (categories.length > 0) {
        const final = await Post.find(
          { $and: [{ postType: type }, { category: categories }] }
        ).populate("user")
          .populate("auctionParticipants")
          .populate({ path: "comments", model: "Comment" })
          .exec();
        res.send(JSON.stringify(final))
      }

      else {
        const final = await Post.find(
          { postType: type }
        ).populate("user")
          .populate("auctionParticipants")
          .populate({ path: "comments", model: "Comment" })
          .exec();
        res.send(JSON.stringify(final))
      }
      return
    }
  }

  else {
    // If there is no price specified, do not filter on price
    if (date) {
      const final = await Post.find({
        $and: [{ postType: type }, { date: date }]
      }).populate('user').populate('comments').exec()
      console.log(final)
      res.send(JSON.stringify(final))
      return
    }

    else {
      // Search the database and send
      const final = await Post.find({ postType: type }).populate('user').populate('comments').exec()
      console.log(final)
      res.send(JSON.stringify(final))
    }
  }
})

router.get('/:postID', async (req, res) => {

  try {
    const post = await Post.findOne({ _id: req.params.postID }).populate('comments').exec()

    if (post) {
      res.send(JSON.stringify(post))
    }

    else {
      res.send("Page not found")
    }
  }
  catch (err) {
    console.log("Page not found")
    res.send("Page not found")
    return
  }

})

router.post('/leaveComment', async (req, res) => {

  const postID = req.body.postID;
  const commenter = req.body.commenter;
  const message = req.body.commentMessage;
  const picture = req.body.commenterPic;

  const comment = await Comment.create({
    postID: postID,
    commenter: commenter,
    commenterPic: picture,
    commentMessage: message,
  });

  const post = await Post.findOne({ _id: postID }).exec();

  // console.log("here", post)

  if (!post.comments) post.comments = [];

  post.comments.push(comment._id);
  post.save();
  res.send("Comment saved");

})

//liking stuff

router.get('/userLikedPosts/:userID', async (req, res) => {
  const user = await User.findOne({ _id: req.params.userID }).exec()
  const posts = user.likedPosts ? user.likedPosts : [];
  console.log(posts)
  res.send(JSON.stringify(posts))
})

router.put("/editPostLikes/:postID", async (req, res) => {
  //const post = await Post.findOne({ _id: req.params})
  if (req.body.liked) {
    await Post.findOneAndUpdate(
      { _id: req.params.postID },
      { $inc: { likes: 1 } }
    ).exec();
  } else if (!req.body.liked) {
    await Post.findOneAndUpdate(
      { _id: req.params.postID },
      { $inc: { likes: -1 } }
    ).exec();
  }
  res.send("Updated likes");
});

router.post("/Liked/:postID", async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId }).exec();
  if (req.body.liked) {
    user.likedPosts.push(req.params.postID);
  } else if (!req.body.liked) {
    user.likedPosts.splice(user.likedPosts.indexOf(req.params.postID));
  }
  user.save();
  //user.likedPosts.append(post)
  res.send("Donezo!");
});

module.exports = router;