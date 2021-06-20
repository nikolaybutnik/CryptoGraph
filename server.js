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
const gateIoClient = new ccxt.gateio()

const run = async () => {
  // const balanceETH = await binanceClient.fetchBalance()
  // console.log(balanceETH.total.ETH)
  // console.log(binanceClient.has)
  // console.log(await binanceClient)
  // console.log(await binanceClient.fetchTrades('TRX/ETH'))
  // console.log(binanceClient.timeframes)
  console.log(
    gateIoClient.loadMarkets().then((data) => console.log(gateIoClient.markets))
  )
  // console.log(await binanceClient.fetchTicker('ETH/USDT'))
  // console.log(await binanceClient.fetchBalance())
}
run()

// server route for test data
app.get('/testdata/:symbol/:pair/:timerange/:interval', async (req, res) => {
  const symbol = req.params.symbol
  const pair = req.params.pair
  const timerange = req.params.timerange
  const interval = req.params.interval
  try {
    binanceClient.fetchOHLCV(`${symbol}/${pair}`, interval).then((data) => {
      const timestamps = data.map((x) => {
        return x[0]
      })
      // console.log(timestamps)
      res.status(200).send({ data: timestamps })
    })
  } catch (err) {
    console.log(err)
  }
})

// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})
