const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  commenter: {
    type: String,
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
  timestamp: {
    type: String,
    require: true,
  },
});

const PostSchema = new mongoose.Schema({
    user : {
        type: String,
        require : false
    },
    description : {
        type: String,
        require : true
    },
    likes : {
        type: Number,
        require : true
    },
    liked : {
        type: Boolean,
        require : false
    },
    comments : [{type: mongoose.Types.ObjectId, ref: "Comment"}]        
})

module.exports = mongoose.model("Comment", CommentSchema)
module.exports = mongoose.model("Post", PostSchema)