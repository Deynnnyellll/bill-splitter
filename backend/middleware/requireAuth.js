import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({err: 'Authorization token is required'})
  }
  
  // getting the token from authorization string
  const token = authorization.split(' ')[1]

  try {
    // confirms the token if it is valid
    const { _id } = jwt.verify(token, process.env.SECRET_KEY)

    // find the user inside the database
    req.user = await User.findOne({ _id }).select('_id')
    // goes to the next controller
    next()

  } catch (err) {
    console.log(err)
    res.status(401).json({err: 'Request is not authorized'})
  }
}

export default requireAuth