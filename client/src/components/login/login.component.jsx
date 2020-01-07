import React from "react";

import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AUTH_TOKEN } from "../../constants";
import { withRouter } from "react-router-dom";

import { Card, Form, Button } from "react-bootstrap";
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const GET_TOKEN = gql`
  {
    token @client
  }
`;

const Login = props => {
  var email = "",
    password = "";

  const client = useApolloClient();

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    errorPolicy: "all"
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :( </p>;
  }
  const onSubmit = e => {
    e.preventDefault();
    login({ variables: { email: email, password: password } })
      .then(usr => {
        localStorage.setItem(AUTH_TOKEN, usr.data.login.token);
        return usr;
      })
      .then(usr => {
        client.writeData({ data: { token: usr.data.login.token } });
        props.history.push("/main");
      })
      .then(() =>
        client.readQuery({
          query: GET_TOKEN
        })
      )
      .then(token => console.log(token))
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange = {e =>email = e.target.value}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange = {e =>password = e.target.value}/>
          </Form.Group>
         
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default withRouter(Login);
