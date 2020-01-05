import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { onError } from "apollo-link-error";

import "./index.css";
import App from "./App";
import {typeDefs , resolver} from './graphql/resolver';

import * as serviceWorker from "./serviceWorker";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql"
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach((error) =>{
      
      console.log(
        `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
      )
        alert(error.message)
    }
    );
 if (networkError) console.log(`[Network error]: ${networkError}`);
})

const link = errorLink.concat(httpLink)
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolver
});

client.writeData({
  data:{
    token:localStorage.AuthToken
  }
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
