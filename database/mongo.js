module.exports = (async () => {
  var mongoose = require("mongoose");
  const AutoIncrement = require("mongoose-sequence")(mongoose);
  await mongoose.connect(
    "mongodb://localhost/topBunk",
    { useNewUrlParser: true }
  );

  var db = mongoose.connection;

var listingSchema = new mongoose.Schema({
  _id: { type: Number, unique: true },
  price: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  minStay: { type: Number, required: true },
  stars: { type: mongoose.Decimal128, required: false },
  numRatings: { type: Number, required: false },
  bookedDates: { type: [String], required: false }
}, { _id: false });
listingSchema.plugin(AutoIncrement, { id: 'listings' });

  var Listing = mongoose.model("Listing", listingSchema);

  // console.log(db);
  return {
    Listing,
    db
  };
})();
