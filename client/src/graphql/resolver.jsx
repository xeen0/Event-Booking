import {gql } from 'apollo-boost'

export const typeDefs = gql`
    extend type Mutation {
        TokenValue(token:String):String
    }
`
const GET_TOKEN = gql`
    {
        token @client
    }
`

export  const resolver = {
    Mutation:{
        TokenValue:(_root , _args , {cache} ) => {
            cache.writeQuery({
                query:GET_TOKEN,
                data:{token:localStorage.AuthToken}
            })
            return localStorage.AuthToken
        }
    }
}