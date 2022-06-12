import { gql } from '@apollo/client';

//addUser(username: String!, email: String!, password: String!): Auth
export const ADD_USER = gql


//login(email: String!, password: String!): Auth
export const LOGIN_USER = gql

//updateUser(input: UserInput!): User
export const UPDATE_USER = gql

//addPost(input: PostInput!): Post
export const ADD_POST = gql

//updatePost(postId: ID!, input: postInput!): Post
export const UPDATE_Post = gql


//removeEvent(eventId: ID!): Event
export const REMOVE_EVENT = gql

//addComment(eventId: ID!, username: String!, commentText: String!)
export const ADD_COMMENT = gql

