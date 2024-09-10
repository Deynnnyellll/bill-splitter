import mongoose from "mongoose";

const Schema = mongoose.Schema


const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    count: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    }
})

const itemListSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    items: [itemSchema] 
})

const positions = new Schema({
    name: {
        type: String,
        required: true
    },

    added: {
        type: Boolean
    },

    itemList: {
        type: itemListSchema,
        required: true
    }

}, {timestamps: true})

const positionSchema = new Schema([positions]);


const Position = mongoose.model('positions', positionSchema);

export default Position;