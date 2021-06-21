const router = require('express').Router()

const binance = require('./exchange-operations/binance-operations')
const kucoin = require('./exchange-operations/kucoin-operations')
const kraken = require('./exchange-operations/kraken-operations')

// Get all currencies available on the exchange
// Payload sent [array of 'string']
router.get('/currencies/:binance/:kucoin/:kraken', async (req, res) => {
  try {
    const toggleBinanceData = req.params.binance
    const toggleKucoinData = req.params.kucoin
    const toggleKrakenData = req.params.kraken

    const binanceCurrencies =
      toggleBinanceData === 'true' ? await binance.getCurrencies() : []
    const kucoinCurrencies =
      toggleKucoinData === 'true' ? await kucoin.getCurrencies() : []
    const krakenCurrencies =
      toggleKrakenData === 'true' ? await kraken.getCurrencies() : []
    // Combine all retrieved currencies and remove duplicates
    const mergedArrays = [
      ...binanceCurrencies,
      ...kucoinCurrencies,
      ...krakenCurrencies,
    ]
    const uniqueSelections = [
      ...new Map(mergedArrays.map((item) => [item.value, item])).values(),
    ]
    res.status(200).send({ data: uniqueSelections })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get all available trade pairs for the currently selected currency
// Payload sent: [array of 'string']
router.get('/pairs/:currency/:binance/:kucoin/:kraken', async (req, res) => {
  try {
    const toggleBinanceData = req.params.binance
    const toggleKucoinData = req.params.kucoin
    const toggleKrakenData = req.params.kraken

    const binancePairs =
      toggleBinanceData === 'true' ? await binance.getPairs(req) : []
    const kucoinPairs =
      toggleKucoinData === 'true' ? await kucoin.getPairs(req) : []
    const krakenPairs =
      toggleKrakenData === 'true' ? await kraken.getPairs(req) : []
    const mergedArrays = [...binancePairs, ...kucoinPairs, ...krakenPairs]
    const uniqueSelections = [
      ...new Map(mergedArrays.map((item) => [item.value, item])).values(),
    ]
    res.status(200).send({ data: uniqueSelections })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get ticker data on symbol/USDT
// Payload sent: {symbol: string, exchangeData: [array of objects {timestamp: number, closingPrice: number}] OR null }
router.get(
  '/graphdata/:symbol/:pairsymbol/:timerange/:interval',
  async (req, res) => {
    const symbol = req.params.symbol
    const pairSymbol = req.params.pairsymbol
    const timeRange = req.params.timerange
    const interval = req.params.interval
    try {
      const binanceGraphData = await binance.getGraphData(
        symbol,
        pairSymbol,
        timeRange,
        interval
      )
      const kucoinGraphData = await kucoin.getGraphData(
        symbol,
        pairSymbol,
        timeRange,
        interval
      )
      const krakenGraphData = await kraken.getGraphData(
        symbol,
        pairSymbol,
        timeRange,
        interval
      )
      res.status(200).send({
        data: {
          symbol: symbol,
          binanceData: binanceGraphData,
          kucoinData: kucoinGraphData,
          krakenData: krakenGraphData,
        },
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }
)

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
