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
        myPost: [Post]
        comment: [ Comment ]
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
        animal: [Animal]
        post: [Post]
    }

    type Animal {
        _id: ID
        species: String
        animal_name: String
        animal_count: Int
    }

    type Post {
        _id: ID
        title: String
        username: String
        trail: [Trail]
        animal: [Animal]
        postText: String
        createdAt: String
        sightDate: String
        comment: [Comment]
    }

    type Comment {
        _id: ID
        commentText: String
        username: String
        createdAt: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User

        alltrails: [Trail]
        trails(city_name: String!): [Trail]
        trail(_id: ID!): Trail

        allanimals: [Animal]
        animal_species(species: String!): [Animal]
        animal(animal_name: String!): Animal

        allpost_trail(trail: ID!): [Post]
        allpost_animal(animal: ID!): [Post]
        post(_id: ID!): Post
 
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
        animal: [String]
        post: [String]
    }

    input AnimalInput {
        species: String
        animal_name: String
        animal_count: Int
    }

    input PostInput {
        title: String
        username: String
        trail: ID
        animal: [ID]
        postText: String
        createdAt: String
        sightDate: String
        comment: [String]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(input: UserInput!): User
        addTrail(input: TrailInput!): Trail
        updateTrail(trailId: ID!, input: TrailInput!): Trail
        addAnimal(input: AnimalInput!): Animal
        updateAnimal(input: AnimalInput!): Animal
        addPost(input: PostInput!): Post
        updatePost(postId: ID!, input: PostInput!): Post
        removePost(postId: ID!): Post
        addComment(postId: ID!, commentText: String!) : Post
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs
