import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  division: {
    type: String,
    enum: ["personal", "office"]
  },
  description: {
    type: String
  },
  account: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Transaction", transactionSchema);
