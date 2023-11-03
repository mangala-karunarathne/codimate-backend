const mongoose = require("mongoose");

const employerSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
   
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;