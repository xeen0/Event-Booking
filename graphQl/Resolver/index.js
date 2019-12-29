const userResolver = require("./users");
const bookingResolver = require("./booking");
const eventsResolver = require("./events");
module.exports = {
  ...userResolver,
  ...bookingResolver,
  ...eventsResolver
};
