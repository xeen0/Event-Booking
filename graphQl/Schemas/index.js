const { buildSchema } = require('graphql')
module.exports = buildSchema(`
type Event{
    _id:ID!
    title: String!
    description: String!
    price : Float!
    date: String!
    createdBy: User!
}
type User{
  _id:ID!
  email:String!
  password:String
  events:[Event!]
}

type RootQuery {
    events:[Event]
    users:[User]
}
input EventInput{
    title: String!,
    description: String!,
    price : Float!
    date: String!
    createdBy : ID!
}
input UserInput {
  email:String!
  password:String!
}
type RootMutation {
    createEvents(eventInput:EventInput):Event
    createUser(userInput: UserInput) : User
}

schema {
    query:RootQuery,
    mutation : RootMutation
}

`);