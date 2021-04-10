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

const getGraphData = (symbol, pairSymbol, timeRange, increment) => {
  const index = 4 // [ timestamp, open, high, low, close, volume ]
  return kucoinClient
    .fetchOHLCV(`${symbol}/${pairSymbol}`, increment)
    .then((data) => {
      let kucoinData
      switch (timeRange) {
        // timestamp and closing price objects for the last 90 days
        case '90days':
          switch (increment) {
            case '1d':
              kucoinData = data.slice(-90).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '12h':
              kucoinData = data.slice(-180).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '8h':
              kucoinData = data.slice(-270).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '4h':
              kucoinData = data.slice(-540).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
          }
          break
        // timestamp and closing price objects for the last 30 days
        case '30days':
          switch (increment) {
            case '1d':
              kucoinData = data.slice(-30).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '12h':
              kucoinData = data.slice(-60).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '8h':
              kucoinData = data.slice(-90).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '4h':
              kucoinData = data.slice(-180).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
          }
          break
        case '7days':
          switch (increment) {
            case '1d':
              kucoinData = data.slice(-7).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '12h':
              kucoinData = data.slice(-14).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '8h':
              kucoinData = data.slice(-21).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
            case '4h':
              kucoinData = data.slice(-42).map((x) => {
                return {
                  timestamp: x[0],
                  closingPrice: x[index],
                }
              })
              break
          }
          break
      }
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
