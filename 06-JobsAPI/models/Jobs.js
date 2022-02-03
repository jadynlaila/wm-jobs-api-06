const mongoose = require("mongoose");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
//not finished, figure out ObjectId on createdBy
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
const jobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Must provide a company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Must provide a position"],
      maxLength: 100,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "interviewed", "declined"],
        message: `{VALUE} is not supported`,
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, 'could not create "createdBy"'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobsSchema);
