const router = require('express').Router()
const axios = require('axios')
const ccxt = require('ccxt')

const binanceClient = new ccxt.binance({
  apiKey: process.env.REACT_APP_BINANCE_API_KEY,
  secret: process.env.REACT_APP_BINANCE_API_SECRET,
})
const kucoinClient = new ccxt.kucoin({
  apiKey: process.env.REACT_APP_KUCOIN_API_KEY,
  secret: process.env.REACT_APP_KUCOIN_API_SECRET,
})

// Get all currencies available on the exchange
// Payload sent [array of 'string']
router.get('/getcurrencies', async (req, res) => {
  binanceClient
    .loadMarkets()
    .then((data) => {
      const processedData = Object.values(binanceClient.currencies).map(
        (currency) => {
          return { value: currency.id, label: currency.id }
        }
      )
      res.status(200).send({ data: processedData })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// Get all available trade pairs for the currently selected currency
// Payload sent: [array of 'string']
router.get('/getpairs/:currency', async (req, res) => {
  const currency = req.params.currency
  binanceClient
    .loadMarkets()
    .then((data) => {
      const allMarkets = binanceClient.markets
      const availablePairs = Object.keys(allMarkets).filter((pair) => {
        // user input first param, so we need the first one to match to the pair
        return pair.includes(currency) && pair.split('/')[0] === currency
      })
      const pairOptions = availablePairs
        .map((pair) => {
          return pair.split('/')[1]
        })
        .map((data) => {
          return { value: data, label: data }
        })
      res.status(200).send({ data: pairOptions })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// Get ticker data on symbol/USDT
// Payload sent: {symbol: string, series: [array of objects {timestamp: number, closingPrice: number}]}
router.get('/getgraphdata/:symbol/:pairsymbol', async (req, res) => {
  const symbol = req.params.symbol
  const pairSymbol = req.params.pairsymbol
  const index = 4 // [ timestamp, open, high, low, close, volume ]
  binanceClient
    .fetchOHLCV(`${symbol}/${pairSymbol}`, '1d') // 1 day increments
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

module.exports = router

// OHLCV Structure
// [
//   1504541580000, // UTC timestamp in milliseconds, integer
//   4235.4,        // (O)pen price, float
//   4240.6,        // (H)ighest price, float
//   4230.0,        // (L)owest price, float
//   4230.7,        // (C)losing price, float
//   37.72941911    // (V)olume (in terms of the base currency), float
// ],
