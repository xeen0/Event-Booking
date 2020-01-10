const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require('cors')
const {createServer } =require('http')
const {ApolloServer} = require('apollo-server-express')

const typeDefs = require('./graphQl/Schemas/index')
const resolvers = require('./graphQl/Resolver/index')

const userAuth = require('./middlewares/is-auth')

const apolloServer = new ApolloServer({typeDefs , resolvers})
const app = express();
app.use(cors())
app.use(bodyParser());
app.use(userAuth)

apolloServer.applyMiddleware({app})

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

mongoose
  .connect("mongodb://localhost:27017/graphql")
  .then(httpServer.listen({ port: 4000 }, () => console.log("Running server at 4000...")))
  .catch(err => console.log(err));
