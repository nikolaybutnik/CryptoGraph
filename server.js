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

const binanceClient = new ccxt.binance({
  apiKey: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET,
})

// Define API routes here
const run = async () => {
  // const balanceETH = await binanceClient.fetchBalance()
  // console.log(balanceETH.total.ETH)
  // console.log(binanceClient.has)
  // console.log(await binanceClient)
  binanceClient
    .loadMarkets()
    .then((res) => console.log(binanceClient.currencies))
  // console.log(await binanceClient.fetchTrades('TRX/ETH'))
  // console.log(await binanceClient.fetchDepositAddress('ETH'))
  // console.log(await binanceClient.fetchTicker('ETH/USDT'))
  // console.log(await binanceClient.fetchBalance())
}
// run()

// Get all currencies available on the exchange
// Payload sent [array of 'string']
app.get('/api/getcurrencies', async (req, res) => {
  binanceClient
    .loadMarkets()
    .then((data) => {
      const processedData = Object.values(binanceClient.currencies).map(
        (currency) => currency.id
      )
      res.status(200).send({ data: processedData })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// Get current ETH/USD price
// Payload sent: {status: string, message: string, result: {ethbtc: string, ethbtc_timestamp: string, ethusd: string, ethusd_timestamp: string}}}
app.get('/api/ethprice', async (req, res) => {
  axios
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

// Get ticker data on symbol/USDT
// Payload sent: {symbol: string, series: [array of objects {timestamp: number, closingPrice: number}]}
app.get('/api/chart/:symbol', async (req, res) => {
  const symbol = req.params.symbol
  const index = 4 // [ timestamp, open, high, low, close, volume ]
  binanceClient
    .fetchOHLCV(`${symbol}/USDT`, '1d') // 1 day increments
    .then((data) => {
      // timestamp and closing price objects for the last 90 results
      const series = data.slice(-90).map((x) => {
        return {
          timestamp: x[0],
          closingPrice: x[index],
        }
      })
      res.status(200).send({ data: { symbol: symbol, series: series } })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
  // const lastPrice = chartData[chartData.length - 1][index] // closing price
  // const timestamps = series.map((timestamp) => {
  //   return new Date(timestamp).toGMTString()
  // })
})

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})

// OHLCV Structure
// [
//   1504541580000, // UTC timestamp in milliseconds, integer
//   4235.4,        // (O)pen price, float
//   4240.6,        // (H)ighest price, float
//   4230.0,        // (L)owest price, float
//   4230.7,        // (C)losing price, float
//   37.72941911    // (V)olume (in terms of the base currency), float
// ],
