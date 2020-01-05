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

type RootQuery {
    events:[Event]
    users:[User]
    booking:[Booking]
}
type RootMutation {
    login(email : String! , password : String!):AuthData!
    createEvents(eventInput:EventInput):Event
    createUser(userInput: UserInput) : User
    createBooking(bookingInput: BookingInput) : Booking
}

schema {
    query:RootQuery,
    mutation : RootMutation

}

`);