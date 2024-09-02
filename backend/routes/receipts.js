import express from 'express';
import { ObjectId } from "mongodb";

import Receipt from '../models/receiptModel.js'

const router = express.Router()

// Get all Receipts from server
router.get('/', async (req, res) => {
  try {
    let receipts = await Receipt.find({}).sort({ createdAt: -1})
    res.send(receipts).status(200)
  } catch (err) {
    console.log(err)
    res.status(500).send("Error getting all Receipts")
  }
})

// Get single Receipt from server
router.get('/receipt/:id', async (req, res) => {
  try {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(404).send("Invalid input ID");
    }

    let receipts = await Receipt.findById(id)
    res.send(receipts).status(200);
  } catch (err) {
    console.log(err)
    res.status(500).send("Error getting a single receipt");
  }
})

// Create a Receipt in server
router.post('/', async (req, res) => {
  try {
    let { title, items, totalAmount } = req.body

    let receipts = await Receipt.create({ title, items, totalAmount })
    res.send(receipts).status(204);
  } catch(err) {
    console.log(err)
    res.status(500).send("Error adding receipt");
  }
})

// Delete a Receipt in server
router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(404).send("Invalid input ID");
    }

    let receipts = await Receipt.findByIdAndDelete({ _id: id})
    res.send(receipts).status(204);
  } catch (err) {
    console.log(err)
    res.status(500).send("Error deleting receipt");
  }
})

// Update a Receipt in server
router.patch('/:id', async (req, res) => {
  try {
    let id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(404).send("Invalid input ID");
    }

    let receipts = await Receipt.findByIdAndUpdate({ _id: id}, { ...req.body})
    res.send(receipts).status(204);
  } catch (err) {
    console.log(err)
    res.status(500).send("Error deleting receipt");
  }
})

export default router