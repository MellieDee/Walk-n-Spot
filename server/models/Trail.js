const { Schema, model } = require('mongoose');

const trailSchema = new Schema(
  {
    trail_name: { //Title
      type: String,
    },

    city_name: { //make sure display
      type: String,
    },

    lat: {
      type: Number,
    },

    lon: {
      type: Number,
    },

    trail_img: { //image link from free source
      type: String,
    },

    tag: { //example: dog-friendly
      type: [String],
    },

    description: {
      type: String,
    },

    Trail_info: { //website for more info
      type: String,
    },

    animal: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Animal'
      }
    ],

    post: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
  },

)

const Trail= model('Trail', trailSchema);

module.exports = Trail;