const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    //get user from token and find their profile
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email'])

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user'})
    }
    res.json(profile)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


//@route GET api/profile/user/:user_id
//@desc get profile by id
//@access public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

    if (!profile) return res.status(400).json({ msg: 'Profile not found' })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send('Server Error')
  }
})

//@route PUT api/profile/addstock
//@desc Add Stock to profile
//@access private

router.put('/addstock', auth, 
async(req, res) => {

  const {
    symbol,
    name,
    units,
    purchasePrice,
  } = req.body
  //construct profile
  const newStock = {
    symbol,
    name,
    units,
    purchasePrice,
  }
  // grab profile to add experience to profile of tokened user
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.stocks.unshift(newStock);

    await profile.save()
    
    res.json(profile)
  } catch (err) {

    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//route DELETE api/profile/addstock/:stock_id
//desc Delete experience from profile

router.delete('/addstock/:stock_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    const removeIndex = profile.stocks.map((item) => item.id).indexOf(req.params.stock_id)

    profile.stocks.splice(removeIndex, 1);

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route PUT api/profile/soldstock
//@desc Add Stock to soldstocks
//@access private

router.put('/soldstock', auth, 
async(req, res) => {

  const {
    symbol,
    name,
    units,
    purchasePrice,
    soldPrice
  } = req.body
  //construct profile
  const newStock = {
    symbol,
    name,
    units,
    purchasePrice,
    soldPrice
  }
  // grab profile to add experience to profile of tokened user
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.soldStocks.unshift(newStock);

    await profile.save()
    
    res.json(profile)
  } catch (err) {

    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router