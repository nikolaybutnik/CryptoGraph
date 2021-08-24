import { format } from 'date-fns'

import { isCurrentlyTrading } from '../utils/HelperFunctions'

import { Currency, Exchange, Options, GraphData, SymbolData } from './types'

// Get current ETH price in USD
// Payload received: {status: string, message: string, result: {ethbtc: string, ethbtc_timestamp: string, ethusd: string, ethusd_timestamp: string}}}
// Action: set ethPrice state as number
const getEthPriceUSD = (
  exchangeRate: number,
  setEthPrice: React.Dispatch<React.SetStateAction<number>>
) => {
  fetch('/api/info/eth', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (data: {
        data: {
          message: string
          result: {
            ethbtc: string
            ethbtc_timestamp: string
            ethusd: string
            ethusd_timestamp: string
          }
          status: string
        }
      }) => {
        setEthPrice(parseFloat(data.data.result.ethusd) * exchangeRate)
      }
    )
    .catch((err) => console.log(err))
}

// Get current BTC price in USD
// Payload received: number
const getBtcPriceUSD = (
  exchangeRate: number,
  setBtcPrice: React.Dispatch<React.SetStateAction<number>>
) => {
  fetch('/api/info/btc', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data: { data: string }) => {
      setBtcPrice(parseFloat(data.data) * exchangeRate)
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
const getExchangeRate = (
  currency: string,
  setFunc: React.Dispatch<React.SetStateAction<Currency>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  fetch(`/api/info/exchangerate/${currency}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const retrievedData = data.data as { x: number }
      const newCurrency = Object.keys(retrievedData).toString().split('_')[1]
      const newExchangeRate = Object.values(retrievedData)[0]
      setFunc({ currency: newCurrency, exchange: newExchangeRate })
    })
    .catch((err) => {
      console.log(err)
      // Heroku deployment issue: API call sometimes returns error 500 while deployed.
      // Workaround, if error is thrown on setting CAD, set exchange rate manually.
      if (err === TypeError) {
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
          case 'HKD':
            setFunc({ currency: 'HKD', exchange: 7.77 })
            break
          case 'CHF':
            setFunc({ currency: 'CHF', exchange: 0.92 })
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
const getCurrencies = (
  func: React.Dispatch<React.SetStateAction<Options[]>>,
  toggleMarketData: Exchange[]
) => {
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
      const retrievedData = data.data as Options[]
      const sortedData = retrievedData.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
      func(sortedData)
    })
}

const getPairs = (
  currency: string,
  setPairOptions: React.Dispatch<React.SetStateAction<Options[]>>,
  toggleMarketData: Exchange[]
) => {
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
    .then((data: { data: Options[] }) => {
      const sortedData = data.data.sort((a, b) =>
        a.value.localeCompare(b.value)
      )
      setPairOptions(sortedData)
    })
    .catch((err) => console.log(err))
}

// Get ticker data on selected symbol from server
// Payload received: {symbol: string, exchangeData: [array of objects {timestamp: number, closingPrice: number}] OR null }
// Action: set graphData state as object {symbol: string, data: [array of objects {timestamp: string, closingPrice: number}]}
const getGraphData = (
  symbol: string,
  pairSymbol: string,
  func: React.Dispatch<React.SetStateAction<GraphData | null>>,
  timeRange: string,
  interval: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
      const retrievedData = data.data as GraphData
      // Format the timestamps to be used as labels on graph
      const binanceProcessedData = retrievedData.binanceData
        ? retrievedData.binanceData.map((obj) => {
            return {
              ...obj,
              timestamp: format(parseInt(obj.timestamp), 'MMM dd yyyy'),
            }
          })
        : null
      const kucoinProcessedData = retrievedData.kucoinData
        ? retrievedData.kucoinData.map((obj) => {
            return {
              ...obj,
              timestamp: format(parseInt(obj.timestamp), 'MMM dd yyyy'),
            }
          })
        : null
      const krakenProcessedData = retrievedData.krakenData
        ? retrievedData.krakenData.map((obj) => {
            return {
              ...obj,
              timestamp: format(parseInt(obj.timestamp), 'MMM dd yyyy'),
            }
          })
        : null
      // Check the recency of last timestamp to see if pair is currently trading
      const dateToCheckBinance = retrievedData.binanceData
        ? retrievedData.binanceData[retrievedData.binanceData.length - 1]
            .timestamp
        : null
      const dateToCheckKucoin = retrievedData.kucoinData
        ? retrievedData.kucoinData[retrievedData.kucoinData.length - 1]
            .timestamp
        : null
      const dateToCheckKraken = retrievedData.krakenData
        ? retrievedData.krakenData[retrievedData.krakenData.length - 1]
            .timestamp
        : null

      func({
        symbol: retrievedData.symbol,
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
const getCurrencyData = (
  symbol: string,
  func: React.Dispatch<React.SetStateAction<SymbolData | null>>
) => {
  fetch(`/api/info/currencydata/${symbol}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const retrievedData = data as SymbolData
      func(retrievedData)
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
