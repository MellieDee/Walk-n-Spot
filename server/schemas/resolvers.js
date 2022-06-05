const { User, Trail, Animal, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const mongoose = require('mongoose');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
        //   .populate('myCurrentEvent')
        //   .populate('myJoinedEvent');
        // console.log(userData.myCurrentEvent)
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
        .select('-__v -password')
      // .populate('myCurrentEvent')
      // .populate('myJoinedEvent');
    },
    // get a user by username
    user: async (parent, { username }) => {
      console.log(username);
      return User.findOne({ username })
        .select('-__v -password')
      // .populate('myCurrentEvent')
      // .populate('myJoinedEvent');
    },

    // find all trails for search bar only (then front end narrows by city & animal maybe trail with related term a la All Trails)
    alltrails: async () => {
      return Trail.find().populate('post');
    },

    //find trails base on city (need to add animal and tag filter)
    trails: async (parent, { city_name }) => {
      return Trail.find({ city_name });
    },
    //find specific trail
    trail: async (parent, { _id }) => {
      return Trail.findOne({ _id });
    },

    //find all animal
    allanimals: async () => {
      return Animal.find();
    },
    //find all animal with specific species 
    animal_species: async (parent, { species }) => {
      return Animal.find({ species });
    },
    //find specific animal by name
    animal: async (parent, { animal_name }) => {
      return Animal.findOne({ animal_name });
    },

    allpost_trail: async(parent, { trail }) => {
      return Post.find({ trail })
                  .populate('trail')
                  .populate('animal');
    },
    allpost_animal: async (parent, { animal }) => {
      return Post.find({ animal });
    },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id })
                .populate('trail')
                .populate('animal');
    }


  },
  Mutation: {

    //////User////////
    addUser: async (parent, args) => {
      console.log("Get Signup Info");
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      var newUser = args.input

      console.log(args)
      console.log(newUser)

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        newUser,
        { new: true }
      );
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },


    //////Trail////////
    addTrail: async (parent, args) => {
      const trail = await Trail.create(args.input); //after client is set up, see if we need args.input instead of args
      //may need something like token for admin
      return trail;
    },

    updateTrail: async (parent, args, context) => {
      var newTrail = args.input; //same as addTrail, may need to change

      return await Trail.findOneAndUpdate(
        { _id: args.input._id },
        newTrail,
        { new: true }
      );
    },


    /////Animal///////
    addAnimal: async (parent, args) => {
      const animal = await Animal.create(args.input);
      return animal;
    },

    updateAnimal: async (parent, args, context) => {
      var newAnimal = args.input;

      return await Animal.findOneAndUpdate(
        { _id: args.input._id },
        newAnimal,
        { new: true }
      );
    },


    /////Post/////////
    addPost: async (parent, args) => {
      const post = await Post.create({...args.input});
      const trail = await Trail.findOneAndUpdate(
        { _id: args.input.trail },
        { $push: { post: post._id }},
        { new: true }
      )

      return post;
    },

    updatePost: async (parent, args, context) => {
      var newPost = args.input;

      return await Post.findOneAndUpdate(
        { _id: args.input._id},
        newPost,
        {new: true}
      );
    },

    removePost: async (parent, args) => {
      return await Post.findOneAndDelete(
        {_id: args.input._id}
        );
    },


  },
};

module.exports = resolvers;