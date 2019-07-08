const express = require('express');
const router = express.Router();
require('dotenv').config()
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');

const User = require('../../models/User');


//route GET api/auth
// test route

router.get('/', auth, async (req, res) => {
  try {
    //find user with id without password
    const user = await User.findById(req.user.id).select('-password')
    //send back user data
    res.json(user)
  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})


// route POST
// authenticate user and get token

router.post('/', [
  check('email', 'Please include valid email').isEmail(),
  check('password', 'Password is required').exists()
],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()})
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
    }

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: 36000}, (err, token) => {
      if (err) throw err;
      res.send({ token })
    })
  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
} )

module.exports = router