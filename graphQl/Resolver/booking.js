const Event = require("../../models/Events");
const Booking = require("../../models/Booking");
  module.exports ={
    createBooking :(args) => {
      return Event.findById(args.bookingInput.eventId)
        .then(evnt => {
          if (!evnt) throw new Error("Event Not Found!!");
          return evnt.createdBy;
        })
        .then(usr => {
          const booking = new Booking({
            event: args.bookingInput.eventId,
            user: usr
          });
          return booking.save();
        })
        .then(res => res)
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    booking :() => Booking.find().populate("user")
  }