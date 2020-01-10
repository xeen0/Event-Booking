const {merge  } =require('lodash') 
const userResolver = require("./users");
const bookingResolver = require("./booking");
const eventsResolver = require("./events");
module.exports = 
  merge(userResolver ,bookingResolver , eventsResolver)

