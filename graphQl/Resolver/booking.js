const Event = require("../../models/Events");
const Booking = require("../../models/Booking");
module.exports = {
  Mutation: {
    createBooking: (_,args, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      return Event.findById(args.bookingInput.eventId)
        .then(evnt => {
          if (!evnt) throw new Error("Event Not Found!!");
          const booking = new Booking({
            event: args.bookingInput.eventId,
            user: req.userId
          });
          return booking.save();
        })
        .then(res => res)
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
  },
  Query: {
    booking: () => Booking.find().populate("user")
  }
};
