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
  }
}, { timestamps: true})

const Receipt = mongoose.model('receipts', receiptSchema)

export default Receipt