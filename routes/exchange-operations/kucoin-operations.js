const ccxt = require('ccxt')

const kucoinClient = new ccxt.kucoin({
  apiKey: process.env.REACT_APP_KUCOIN_API_KEY,
  secret: process.env.REACT_APP_KUCOIN_API_SECRET,
})

const getCurrencies = (req, res) => {
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
}

const getPairs = (req, res) => {
  const currency = req.params.currency
  binanceClient
    .loadMarkets()
    .then((data) => {
      const allMarkets = binanceClient.markets
      const availablePairs = Object.keys(allMarkets).filter((pair) => {
        // user inputs currency which is needed to find availabel trade pairs
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
}

const getGraphData = (req, res, symbol, pairSymbol) => {
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
}

module.exports = { getCurrencies, getPairs, getGraphData }
