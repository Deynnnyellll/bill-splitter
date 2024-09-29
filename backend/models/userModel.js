import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
})

userSchema.statics.signup = async function(username, email, password) {
  if (!username || !email || !password) {
    throw Error('Please all fields must be filled')
  } else if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email address')
  } else if (!validator.isStrongPassword(password)) {
    throw Error('Please provide a strong password')
  }

  const emailExists = await this.findOne({ email })

  if (emailExists) {
    throw Error('This email was already used by another user')
  }
  
  // Creates a random string for hashing
  const salt = await bcrypt.genSalt(10)
  // Hash both password and salt
  const hash = await bcrypt.hash(password, salt)
  // Creates new user on database
  const user = await this.create({ username, email, password: hash })

  return user
}

userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('Please all fields must be filled')
  } 

  const userExists = await this.findOne({ email })

  if (!userExists) {
    throw Error('This email does not exist')
  }
  
  // Checks if it match on the inputted value
  const match = await bcrypt.compare(password, userExists.password)

  if (!match) {
    throw Error('Invalid password please try again!')
  }

  return userExists
}

const User = mongoose.model('user', userSchema)

export default User