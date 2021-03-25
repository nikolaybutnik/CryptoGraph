const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const ccxt = require('ccxt')
const axios = require('axios')

require('dotenv').config()

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// Define API routes here
const tick = async (config, binanceClient) => {}

const run = () => {
  const binanceClient = new ccxt.binance({
    apiKey: process.env.REACT_APP_API_KEY,
    secret: process.env.REACT_APP_API_SECRET,
  })
}

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
