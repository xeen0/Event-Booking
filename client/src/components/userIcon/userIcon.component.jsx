import React from "react";
import { NavLink } from "react-router-dom";
import {gql } from 'apollo-boost'
import { Query } from "react-apollo";
import { graphql } from 'react-apollo';

const GET_TOKEN = gql`
    {
        token @client
    }
`

const UserIcon = () => (
    <Query query={GET_TOKEN}>
    {
        ({data})=>{
            console.log(data)
            if(data) return <h1>sahas</h1>
            return  <NavLink to="/auth">Login</NavLink>
        }
    }
    </Query>
);

export default (graphql(GET_TOKEN ))(UserIcon);
