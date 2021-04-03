const router = require('express').Router()
const axios = require('axios')
const ccxt = require('ccxt')

const binance = require('./exchange-operations/binance-operations')
const kucoin = require('./exchange-operations/kucoin-operations')

// Get all currencies available on the exchange
// Payload sent [array of 'string']
router.get('/getcurrencies', (req, res) => {
  binance.getCurrencies(req, res)
  // kucoin.getCurrencies(req, res)
})

// Get all available trade pairs for the currently selected currency
// Payload sent: [array of 'string']
router.get('/getpairs/:currency', (req, res) => {
  binance.getPairs(req, res)
  // kucoin.getPairs(req, res)
})

// Get ticker data on symbol/USDT
// Payload sent: {symbol: string, exchangeData: [array of objects {timestamp: number, closingPrice: number}] OR null }
router.get('/getgraphdata/:symbol/:pairsymbol', async (req, res) => {
  const symbol = req.params.symbol
  const pairSymbol = req.params.pairsymbol
  try {
    const binanceGraphData = await binance.getGraphData(symbol, pairSymbol)
    const kucoinGraphData = await kucoin.getGraphData(symbol, pairSymbol)
    // console.log(binanceGraphData)
    // console.log(kucoinGraphData)
    res.status(200).send({
      data: {
        symbol: symbol,
        binanceData: binanceGraphData,
        kucoinData: kucoinGraphData,
      },
    })
  } catch (err) {
    console.log(err)
  }
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
