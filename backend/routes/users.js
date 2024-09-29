import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js'

const router = express.Router()

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: '2d'})
}

// Login an account
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body

    const user = await User.login(email, password)
    // creates new token for login user
    const token = createToken(user._id)
    // res.send(user).status(204)
    res.status(200).json({user, token})
  } catch(err) {
    console.log(err)
    res.status(400).json({ err: err.message });
    // res.status(500).send("Error logging an account");
  }
})

// Sign up an account
router.post('/signup', async (req, res) => {
  try {
    let { username, email, password } = req.body

    const user = await User.signup(username, email, password)
    // creates new token for new user
    const token = createToken(user._id)
    // res.send(user).status(204)
    res.status(200).json({user, token})
  } catch(err) {
    console.log(err)
    res.status(400).json({ err: err.message });
    // res.status(500).send("Error logging an account");
  }
})

export default router