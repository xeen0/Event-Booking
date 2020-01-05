import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import MainPage from "../Main/main.page";

const LOGIN_USER = gql`
  query  login($email:String! , $password:String!){
        login(email:$email , password:$password){
            _id
        }
    }
`;

const AuthPageContainer = ({ email, password }) => (
  <Query query={LOGIN_USER} variables={{ email: email, password: password }}>
        {({ loading, error, data }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (loading) {
        console.log("loading...");
      }
      console.log(data);
      return <MainPage />;
    }}
  </Query>
);

export default AuthPageContainer;
