const express = require('express');
const connectDB = require('./config/db')
const app = new express()
const cors = require('cors');

require('dotenv').config()

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}))


app.get('/', (req, res) => {
  res.send('Api running')
})
app.use(cors())
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})