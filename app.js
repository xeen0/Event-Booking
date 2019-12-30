const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchemas = require('./graphQl/Schemas/index')
const graphQlResolvers = require('./graphQl/Resolver/index')

const userAuth = require('./middlewares/is-auth')

const app = express();
app.use(bodyParser());
app.use(userAuth)

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchemas,
    rootValue:graphQlResolvers ,
    graphiql: true
  })
);

mongoose
  .connect("mongodb://localhost:27017/graphql")
  .then(app.listen(3000, () => console.log("Running server at 3000...")))
  .catch(err => console.log(err));
