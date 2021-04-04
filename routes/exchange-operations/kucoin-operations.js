const ccxt = require('ccxt')

const kucoinClient = new ccxt.kucoin({
  apiKey: process.env.REACT_APP_KUCOIN_API_KEY,
  secret: process.env.REACT_APP_KUCOIN_API_SECRET,
})

const getCurrencies = () => {
  return kucoinClient
    .loadMarkets()
    .then((data) => {
      const processedData = Object.values(kucoinClient.currencies).map(
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

const getPairs = (req, res) => {
  const currency = req.params.currency
  return kucoinClient
    .loadMarkets()
    .then((data) => {
      const allMarkets = kucoinClient.markets
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

const getGraphData = (symbol, pairSymbol) => {
  const index = 4 // [ timestamp, open, high, low, close, volume ]
  return kucoinClient
    .fetchOHLCV(`${symbol}/${pairSymbol}`, '1d') // 1 day increments
    .then((data) => {
      // timestamp and closing price objects for the last 90 results
      const kucoinData = data.slice(-90).map((x) => {
        return {
          timestamp: x[0],
          closingPrice: x[index],
        }
      })
      return kucoinData
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
