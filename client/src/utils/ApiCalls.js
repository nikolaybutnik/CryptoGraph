import { format } from 'date-fns'

// Get current ETH price in USD
// Payload received: {status: string, message: string, result: {ethbtc: string, ethbtc_timestamp: string, ethusd: string, ethusd_timestamp: string}}}
// Action: set ethPrice state as number
const getEthPriceUSD = (func) => {
  fetch('/api/ethprice', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json(res))
    .then((data) => {
      func(data.data.result.ethusd)
    })
    .catch((err) => console.log(err))
}

// Get exhange rates based on USD
// Payload received: {status: string, message: string, result: {ethbtc: string, ethbtc_timestamp: string, ethusd: string, ethusd_timestamp: string}}}
// Action: set exhangeRate state as object {base: string, date: string, rates: multiple properties {string: number}}
const getExchangeRate = (func) => {
  fetch('https://api.exchangeratesapi.io/latest?base=USD')
    .then((res) => res.json())
    .then((data) => func(data))
}

// Get ticker data on selected symbol from server
// Payload received: {symbol: string, series: [array of objects {timestamp: number, closingPrice: number}]}
// Action: set last90Days state as object {symbol: string, data: [array of objects {timestamp: string, closingPrice: number}]}
const getLast90Days = (e, symbol, func) => {
  e.preventDefault()
  fetch(`/api/chart/${symbol}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json(res))
    .then((data) => {
      const processedData = data.data.series.map((obj) => {
        return { ...obj, timestamp: format(obj.timestamp, 'MMM dd') }
      })
      func({ symbol: data.data.symbol, data: processedData })
    })
    .catch((err) => console.log(err))
}

export { getEthPriceUSD, getExchangeRate, getLast90Days }
