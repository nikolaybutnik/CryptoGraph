// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
// import path from 'path'
// import ccxt from 'ccxt'

// @ts-ignore
// import apiInfoRoutes from './routes/api-general-info.routes'
// @ts-ignore
// import apiGraphRoutes from './routes/api-graph-info.routes'

require('dotenv').config()
const express = require('express')
const path = require('path')
// const ccxt = require('ccxt')
const app = express()

const PORT = process.env.PORT || 3001

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// API calls to aquire price of ETH and USD/CAD exchance rate
app.use('/api/info', require('./routes/api-general-info.routes'))
// API calls to exchanges for obtaining graph related information
app.use('/api/graph', require('./routes/api-graph-info.routes'))

// const binanceClient = new ccxt.binance({
//   apiKey: process.env.REACT_APP_BINANCE_API_KEY,
//   secret: process.env.REACT_APP_BINANCE_API_SECRET,
// })
// const kucoinClient = new ccxt.kucoin({
//   apiKey: process.env.REACT_APP_KUCOIN_API_KEY,
//   secret: process.env.REACT_APP_KUCOIN_API_SECRET,
// })
// const krakenClient = new ccxt.kraken()

// const run = async () => {
// const balanceETH = await binanceClient.fetchBalance()
// console.log(balanceETH.total.ETH)
// console.log(binanceClient.has)
// console.log(await binanceClient)
// console.log(await binanceClient.fetchTrades('TRX/ETH'))
// console.log(binanceClient.timeframes)
// console.log(
//   krakenClient.fetchOHLCV(`BTC/USDC`, '1d').then((data) => console.log(data))
// )
// console.log(await binanceClient.fetchTicker('ETH/USDT'))
// console.log(await binanceClient.fetchBalance())
// }
// run()

// server route for test data
// app.get('/testdata/:symbol/:pair/:timerange/:interval', async (req, res) => {
//   const symbol = req.params.symbol
//   const pair = req.params.pair
//   const timerange = req.params.timerange
//   const interval = req.params.interval
//   try {
//     binanceClient.fetchOHLCV(`${symbol}/${pair}`, interval).then((data) => {
//       const timestamps = data.map((x) => {
//         return x[0]
//       })
//       // console.log(timestamps)
//       res.status(200).send({ data: timestamps })
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
