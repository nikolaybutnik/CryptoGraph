import { format } from 'date-fns'

import { isCurrentlyTrading } from '../utils/HelperFunctions'

// Get current ETH price in USD
// Payload received: {status: string, message: string, result: {ethbtc: string, ethbtc_timestamp: string, ethusd: string, ethusd_timestamp: string}}}
// Action: set ethPrice state as number
const getEthPriceUSD = (exchangeRate, setFunc) => {
  fetch('/api/info/eth', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setFunc((data.data.result.ethusd * exchangeRate).toFixed(2))
    })
    .catch((err) => console.log(err))
}

// Get current BTC price in USD
// Payload received: number
const getBtcPriceUSD = (exchangeRate, setFunc) => {
  fetch('/api/info/btc', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setFunc((parseFloat(data.data) * exchangeRate).toFixed(2))
    })
    .catch((err) => console.log(err))
}

// Get exhange rates based on USD
// Payload received: {USD_CAD: number}
// Action: set exhangeRate state as number
// FREE API LIMITS
// Currency Pairs per Request: 2
// Number of Requests per Hour: 100
// Date Range in History: 8 Days
// Allowed Back in History: 1 Year(s)
const getExchangeRate = (currency, setFunc, setMessage) => {
  fetch(`/api/info/exchangerate/${currency}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const newCurrency = Object.keys(data.data).toString().split('_')[1]
      const newExchangeRate = Object.values(data.data)[0]
      setFunc({ currency: newCurrency, exchange: newExchangeRate })
    })
    .catch((err) => {
      console.log(err)
      // Heroku deployment issue: API call sometimes returns error 500 while deployed.
      // Workaround, if error is thrown on setting CAD, set exchange rate manually.
      if (TypeError) {
        switch (currency) {
          case 'CAD':
            setFunc({ currency: 'CAD', exchange: 1.23 })
            break
          case 'EUR':
            setFunc({ currency: 'EUR', exchange: 0.84 })
            break
          case 'GBP':
            setFunc({ currency: 'GBP', exchange: 0.73 })
            break
          case 'JPY':
            setFunc({ currency: 'JPY', exchange: 111 })
            break
          case 'CNY':
            setFunc({ currency: 'CNY', exchange: 6.47 })
            break
          default:
            setFunc({ currency: 'USD', exchange: 1 })
        }
        setMessage(
          'Most recent conversion rate could not be obtained. The current numbers are estimated.'
        )
      }
    })
}

// Get all available currencies on the exchange
// Payload received [array of 'string']
// Action: set allCurrencies state as array of strings containing currency codes
const getCurrencies = (func, toggleMarketData) => {
  const marketData = toggleMarketData.map((data) => {
    const name = Object.keys(data)[0]
    const status = Object.values(data)[0]
    return `&${name}=${status}`
  })
  fetch(`/api/graph/currencies/${marketData.join('')}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const sortedData = data.data.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
      func(sortedData)
    })
}

const getPairs = (currency, func, toggleMarketData) => {
  const marketData = toggleMarketData.map((data) => {
    const name = Object.keys(data)[0]
    const status = Object.values(data)[0]
    return `&${name}=${status}`
  })
  fetch(`/api/graph/pairs/${currency}/${marketData.join('')}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const sortedData = data.data.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
      func(sortedData)
    })
    .catch((err) => console.log(err))
}

// Get ticker data on selected symbol from server
// Payload received: {symbol: string, exchangeData: [array of objects {timestamp: number, closingPrice: number}] OR null }
// Action: set graphData state as object {symbol: string, data: [array of objects {timestamp: string, closingPrice: number}]}
const getGraphData = (
  symbol,
  pairSymbol,
  func,
  timeRange,
  interval,
  setLoading
) => {
  fetch(
    `/api/graph/graphdata/${symbol}/${pairSymbol}/${timeRange}/${interval}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // Format the timestamps to be used as labels on graph
      const binanceProcessedData = data.data.binanceData
        ? data.data.binanceData.map((obj) => {
            return { ...obj, timestamp: format(obj.timestamp, 'MMM dd yyyy') }
          })
        : null
      const kucoinProcessedData = data.data.kucoinData
        ? data.data.kucoinData.map((obj) => {
            return { ...obj, timestamp: format(obj.timestamp, 'MMM dd yyyy') }
          })
        : null
      const krakenProcessedData = data.data.krakenData
        ? data.data.krakenData.map((obj) => {
            return { ...obj, timestamp: format(obj.timestamp, 'MMM dd yyyy') }
          })
        : null
      // Check the recency of last timestamp to see if pair is currently trading
      const dateToCheckBinance = data.data.binanceData
        ? data.data.binanceData[data.data.binanceData.length - 1].timestamp
        : null
      const dateToCheckKucoin = data.data.kucoinData
        ? data.data.kucoinData[data.data.kucoinData.length - 1].timestamp
        : null
      const dateToCheckKraken = data.data.krakenData
        ? data.data.krakenData[data.data.krakenData.length - 1].timestamp
        : null

      func({
        symbol: data.data.symbol,
        pairSymbol: pairSymbol,
        binanceData: binanceProcessedData,
        kucoinData: kucoinProcessedData,
        krakenData: krakenProcessedData,
        isTradingBinance: isCurrentlyTrading(dateToCheckBinance),
        isTradingKucoin: isCurrentlyTrading(dateToCheckKucoin),
        isTradingKraken: isCurrentlyTrading(dateToCheckKraken),
      })

      setLoading(false)
    })
    .catch((err) => console.log(err))
}

// Get general info and USD conversion data on the requested currency
// Payload received {conversionData: {object}, generalData: {object}}
const getCurrencyData = (symbol, func) => {
  fetch(`/api/info/currencydata/${symbol}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      func(data)
    })
    .catch((err) => console.log(err))
}

export {
  getEthPriceUSD,
  getBtcPriceUSD,
  getExchangeRate,
  getPairs,
  getGraphData,
  getCurrencies,
  getCurrencyData,
}
