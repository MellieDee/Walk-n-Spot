const { User, Event, Comment } = require('../models');
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
  },
  Mutation: {

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
    }
  }
};

module.exports = resolvers;
