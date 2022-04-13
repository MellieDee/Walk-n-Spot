const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const sightDateFormat = require('../utils/sightDateFormat');
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  title: {
    type: String,
  },
  trail: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Trail'

    }
  ],
  animal: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Animal'

    }
  ],

///////////////maybe add image later

  postText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  sightDate: {
    type: String,
    max: '2400-01-01',
    get: date => sightDateFormat(date)
  },
 
  comment: [commentSchema],
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

const Post = model('Post', postSchema);

module.exports = Post;