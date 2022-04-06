const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const app = express();
const PORT = process.env.PORT || 3001;

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// Initialize the Apollo server

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// app.use(routes);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/'));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer(typeDefs, resolvers)