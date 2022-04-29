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

    type Trail {
        _id: ID
        trail_name: String
        city_name: String
        lat: Float
        lon: Float
        trail_img: String
        tag: [String]
        description: String
        Trail_info: String
        # animal: [Animal]
        # post: [Post]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        trails(city_name: String!): [Trail]
        trail(_id: ID!): Trail
    }

    input UserInput {
        avatar: String
        bioText: String
    }

    input TrailInput {
        trail_name: String
        city_name: String
        lat: Float
        lon: Float
        trail_img: String
        tag: [String]
        description: String
        Trail_info: String
        # animal: [Animal]
        # post: [Post]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(input: UserInput!): User
        addTrail(input: TrailInput!): Trail
        updateTrail(input: TrailInput!): Trail

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
