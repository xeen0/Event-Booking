const User = require("../../models/Users")
const bcrypt = require("bcrypt");
 module.exports = {
  createUser : (args) => {
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
      })
  },
  users :  () => User.find()
 }