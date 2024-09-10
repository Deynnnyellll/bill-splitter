import express from "express";
import Position from "../models/positionsModel.js";

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const bill =  await Position.create(req.body)
        res.status(200).json(req.body)
    }
    catch(err) {
        res.status(500).json({message: err})
    }
})

export default router