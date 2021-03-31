import { format } from 'date-fns'

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
      // console.log(data.data.result.ethusd)
      func(data.data.result.ethusd)
    })
    .catch((err) => console.log(err))
}

const getExchangeRate = (func) => {
  fetch('https://api.exchangeratesapi.io/latest?base=USD')
    .then((res) => res.json())
    .then((data) => {
      func(data)
    })
}

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
      console.log(data)
      const processedData = data.data.series.map((obj) => {
        return { ...obj, timestamp: format(obj.timestamp, 'MMM dd') }
      })
      func({ symbol: data.data.symbol, data: processedData })
    })
    .catch((err) => console.log(err))
}

export { getEthPriceUSD, getExchangeRate, getLast90Days }
