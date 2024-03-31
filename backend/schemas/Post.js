const mongoose = require('mongoose')
const { createIndexes, User } = require('./User')

const CommentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  commenter: {
    type: String,
    ref: "User",
    require: true,
  },
  commenterPic: {
    type: String,
    require: false,
  },
  commentMessage: {
    type: String,
    require: true,
  },
  timestamp: String,
});

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: false,
  },
  postTitle: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    require: true,
  },
  liked: {
    type: Boolean,
    require: false,
  },
  pictureURL: {
    type: [String],
    require: false,
  },
  postType: {
    type: String,
    require: false,
    default: "item"
  },
  category: {
    type: String,
    require: false,
  },
  price: {
    type: String,
    require: false,
  },
  payRate: {
    type: String,
    require: false,
  },
  quality: {
    type: String,
    require: false,
  },
  year: {
    type: String,
    require: false,
  },
  location: {
    type: String,
    require: false,
  },
  date: {
    type: Date,
    require: false,
  },
  auctionEnd: {
    type: Date,
    require: false,
  },
  startingBid: {
    type: Number,
    require: false,
  },
  auctionParticipants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    require: false,
  },
  auctionBids: {
    type: [Number],
    require: false
  },
  auctionStatus: {
    type: Boolean,
    default: false,
    require: false,
  },
  timestamp: {
    type: Date,
    require: false,
    default: Date.now()
  },
  //comments : [{type: mongoose.Types.ObjectId, ref: "Comment"}]
  comments: [],
});

// module.exports = mongoose.model("Post", PostSchema)

PostSchema.index({ description: "text" })
const Comment = mongoose.model("Comment", CommentSchema) 
const Post = mongoose.model("Post", PostSchema)
Post.createIndexes()
module.exports = {Comment, Post}