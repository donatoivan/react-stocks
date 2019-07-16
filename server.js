const express = require('express');
const connectDB = require('./config/db')
const app = new express()
const cors = require('cors');
const path = require('path');

require('dotenv').config()

connectDB();


app.use(express.json({extended: false}))


app.get('/', (req, res) => {
  res.send('Api running')
})
app.use(cors())
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-side', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})