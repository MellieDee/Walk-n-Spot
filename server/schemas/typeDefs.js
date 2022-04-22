const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
        avatar: String
        bioText: String
        favoriteAnimal: String
        # totalCount: Int
        # savedTrail: [Trail]
        # myPost: [Post]
        # comment: [ Comment ]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    input UserInput {
        avatar: String
        bioText: String
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(input: UserInput!): User
        # addEvent(input: EventInput!): Event
        # joinEvent(eventId: ID!): User
        # removeJoined(eventId: ID!): User
        # updateEvent(eventId: ID!, input: EventInput!): Event
        # removeEvent(eventId: ID!): Event
        # addComment(eventId: ID!, commentText: String!) : Event
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs
