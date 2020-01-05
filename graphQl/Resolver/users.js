const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: args => {
    return User.find({ email: args.userInput.email })
      .then(usr => {
        if (!usr.length == 0)
          throw new Error("This email is already in use....!!!");
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          username:args.userInput.username,
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(usr => usr)
      .catch(err => {
        throw err;
      });
  },
  users: () => User.find(),
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) throw new Error("Incorrect Email!");
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) throw new Error("Incorrect password!");
      const token = await jwt.sign(
        { userId: user._id, email: user.email },
        'SECREAT_KEY',
        {expiresIn: '1h'}
      );
      return {
        _id:user.id,
        token:token,
        expiration:1
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
