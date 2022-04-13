const { Schema, model } = require('mongoose');

const animalSchema = new Schema(
  {
    species: { //admin will verify
      type: String,
    },
    animal_name: {
      type: String,
    },
    animal_count: { //user cannot update this number
      type: Number,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

const Animal = model('Animal', animalSchema);

module.exports = Animal;