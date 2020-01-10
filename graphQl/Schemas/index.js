const { gql } = require('apollo-server-express')
module.exports = gql`
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
  username:String!
  email:String!
  password:String
  events:[Event!]
}

type Booking {
    _id:ID!
    user:User
    event:Event
}

type AuthData {
    _id:ID!
    token:String!
    expiration:Int!
}

input BookingInput{
    eventId:ID!
}
input EventInput{
    title: String!,
    description: String!,
    price : Float!
    date: String!
    createdBy : ID!
}
input UserInput { 
  username:String!
  email:String!
  password:String!
}

type Query {
    users:[User]
    events:[Event]
    booking:[Event]
}
type Mutation {
    login(email : String! , password : String!):AuthData!
    createEvents(eventInput:EventInput):Event
    createUser(userInput: UserInput) : User
    createBooking(bookingInput: BookingInput) : Booking
}
type Subscription {
    userSubscription : User
}



`;