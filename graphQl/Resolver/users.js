const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {PubSub } = require('apollo-server-express')
const pubsub = new PubSub()
const USER_SUBSCRITION = 'USER_SUBSCRITION'
module.exports = {
  Mutation: {
    createUser: (_ , args) => {
      console.log(args);
      return User.find({ email: args.userInput.email })
        .then(usr => {
          if (!usr.length == 0)
            throw new Error("This email is already in use....!!!");
          return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hashedPassword => {
          const user = new User({
            username: args.userInput.username,
            email: args.userInput.email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(usr => {
        pubsub.publish(USER_SUBSCRITION , {userSubscription:usr})
         return usr
        })
        .catch(err => {
          throw err;
        });
    },
    login: async (_,{ email, password }) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("Incorrect Email!");
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("Incorrect password!");
        const token = await jwt.sign(
          { userId: user._id, email: user.email },
          "SECREAT_KEY",
          { expiresIn: "1h" }
          

        );
        pubsub.publish(USER_SUBSCRITION , {userSubscription: user})
        return {
          _id: user.id,
          token: token,
          expiration: 1
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Query: {
    users: () => User.find()
  },
  Subscription :{
    userSubscription :{
      subscribe : () =>pubsub.asyncIterator([USER_SUBSCRITION])
    }
  }
};
