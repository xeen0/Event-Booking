const Event = require("../../models/Events");


module.exports = {
    createEvent : (args) => {
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
      }
    ,
    events: () =>
    Event.find()
      .populate("createdBy")
      .then(events => events)
      .catch(err => {
        console.log(err);
        throw err;
      })
}