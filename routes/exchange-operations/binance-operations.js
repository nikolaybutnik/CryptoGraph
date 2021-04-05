const ccxt = require('ccxt')

const binanceClient = new ccxt.binance({
  apiKey: process.env.REACT_APP_BINANCE_API_KEY,
  secret: process.env.REACT_APP_BINANCE_API_SECRET,
})

const getCurrencies = () => {
  return binanceClient
    .loadMarkets()
    .then((data) => {
      const processedData = Object.values(binanceClient.currencies).map(
        (currency) => {
          return { value: currency.id, label: currency.id }
        }
      )
      return processedData
    })
    .catch((err) => {
      console.log(err)
    })
}

const getPairs = (req) => {
  const currency = req.params.currency
  return binanceClient
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
      return pairOptions
    })
    .catch((err) => {
      console.log(err)
    })
}

const getGraphData = (symbol, pairSymbol, timeRange) => {
  const index = 4 // [ timestamp, open, high, low, close, volume ]
  return binanceClient
    .fetchOHLCV(`${symbol}/${pairSymbol}`, timeRange)
    .then((data) => {
      // timestamp and closing price objects for the last 90 results
      const binanceData = data.slice(-90).map((x) => {
        return {
          timestamp: x[0],
          closingPrice: x[index],
        }
      })
      return binanceData
    })
    .catch((err) => {
      if (err.name === 'BadSymbol') {
        return null
      } else {
        console.log(err)
      }
    })
}

module.exports = { getCurrencies, getPairs, getGraphData }
