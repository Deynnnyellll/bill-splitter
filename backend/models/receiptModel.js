import mongoose from "mongoose";

const Schema = mongoose.Schema

const receiptSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  user_id: {
    type: String, 
    required: true
  },
  // countPersons: {
  //   type: Number,
  //   required: true
  // }
}, { timestamps: true})

const Receipt = mongoose.model('receipts', receiptSchema)

export default Receipt