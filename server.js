require('dotenv').config()

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const ccxt = require('ccxt')

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

const binanceClient = new ccxt.binance({
  apiKey: process.env.REACT_APP_BINANCE_API_KEY,
  secret: process.env.REACT_APP_BINANCE_API_SECRET,
})
const kucoinClient = new ccxt.kucoin({
  apiKey: process.env.REACT_APP_KUCOIN_API_KEY,
  secret: process.env.REACT_APP_KUCOIN_API_SECRET,
})

const run = async () => {
  // const balanceETH = await binanceClient.fetchBalance()
  // console.log(balanceETH.total.ETH)
  // console.log(binanceClient.has)
  // console.log(await binanceClient)
  // binanceClient.loadMarkets().then((res) => {
  //   const allMarkets = binanceClient.markets
  //   const filtered = Object.keys(allMarkets).filter((pair) => {
  //     return pair.includes('ETH') && pair.split('/')[0] === 'ETH' // user input first param, so we need the first one to match to the pair
  //   })
  //   console.log(filtered)
  // })
  // console.log(await binanceClient.fetchTrades('TRX/ETH'))
  console.log(kucoinClient.has)
  // console.log(await binanceClient.fetchDepositAddress('ETH'))
  // console.log(await binanceClient.fetchTicker('ETH/USDT'))
  // console.log(await binanceClient.fetchBalance())
}
run()

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
