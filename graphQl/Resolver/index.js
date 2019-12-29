const bcrypt = require("bcrypt");

const Event = require("../../models/Events");
const User = require("../../models/Users");

module.exports = {
  events: () =>
    Event.find()
      .populate("createdBy")
      .then(events => events)
      .catch(err => {
        console.log(err);
        throw err;
      }),
  users: () => User.find(),
  createEvents: args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      createdBy: args.eventInput.createdBy
    });
    return event
      .save()
      .then(async result => {
        await User.findById(result.createdBy).then(usr => {
          if (usr.length == 0) throw new Error("User not found");
          usr.events.push(result.id);
          usr.save();
        });
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createUser: args => {
    return User.find({ email: args.userInput.email })
      .then(usr => {
        if (!usr.length == 0)
          throw new Error("This email is already in use....!!!");
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(usr => usr)
      .catch(err => {
        throw err;
      });
  }
};
