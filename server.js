require('dotenv').config()

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const ccxt = require('ccxt')
const axios = require('axios')

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// Define API routes here
const tick = async (config, binanceClient) => {}

const run = async () => {
  const binanceClient = new ccxt.binance({
    apiKey: process.env.REACT_APP_API_KEY,
    secret: process.env.REACT_APP_API_SECRET,
  })
  const balanceETH = await binanceClient.fetchBalance()
  console.log(balanceETH.total.ETH)
  // console.log(binanceClient.has)
  // binanceClient.loadMarkets().then((res) => console.log(binanceClient.markets))
  // console.log(await binanceClient.fetchTrades('TRX/ETH'))
  // console.log(await binanceClient.fetchDepositAddress('ETH'))
  // console.log(await binanceClient.fetchTicker('ETH/USDT'))
  // console.log(await binanceClient.fetchBalance())
}
// run()

// Get current ETH/USD price
app.get('/api/ethprice', async (req, res) => {
  const ethPrice = await axios
    .get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    )
    .then((data) => {
      const retrievedData = data.data
      res.status(200).send({ data: retrievedData })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
