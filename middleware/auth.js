const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
  //token is in headers
  const token = req.header('x-auth-token');
  //if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied' })
  }

  try {
    //decode token
    const decoded = jwt.verify(token, process.env.jwtSecret);
    //grab user from token
    req.user = decoded.user
    //call next as we're in middleware
    next();
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid'})
  }
}