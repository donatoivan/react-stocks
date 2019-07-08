const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const User = require('../../models/User');


// route:  POST api/users
// desciption:  Register User


router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please include a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res) => {
  const errors = validationResult(req)
  //return any existing validation errors if present
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ errors: errors.array()});
  }

    // destructure request body
  const { name, email, password } = req.body

  try {

    // see if user exists
    let user = await User.findOne({ email })

    if (user) {
      res.status(400).json({ msg: 'User already exists'})
    }

    // initialize new user
    user = new User({ name, email, password });
    // grind salt
    const salt = await bcrypt.genSalt(10);
    //add salt to user password
    user.password = await bcrypt.hash(password, salt)
    //save user
    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    } 

    const profileFields = {}
    profileFields.user = user.id
    let profile = new Profile(profileFields);
    await profile.save()

    jwt.sign(
      payload, process.env.jwtSecret, 
      { expiresIn: 360000}, 
      (err, token) => {
      if (err) throw err;
      res.send({ token })
    })

  } catch(err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }

})

module.exports = router;
