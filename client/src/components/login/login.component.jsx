import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AUTH_TOKEN } from "../../constants";
import { withRouter } from "react-router-dom";
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;


const Login = props => {
  var email = "",
    password = "";
  const [login, { loading, error, data }] = useMutation(LOGIN_USER, {
    errorPolicy: "all"
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :( </p>;
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        login({ variables: { email: email, password: password } })
          .then(usr => {
            localStorage.setItem(AUTH_TOKEN, usr.data.login.token);
            props.history.push("/main");
          })
          .catch(e => {
            console.log(e);
          });
      }}
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={e => (email = e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={e => (password = e.target.value)}
          id="password"
        />
      </div>
      <button type="submit">Login </button>
    </form>
  );
};

export default  withRouter(Login);
