import React, { useEffect, useState } from 'react'
import './App.css'

import {
  getCurrencies,
  getEthPriceUSD,
  getExchangeRate,
  getLast90Days,
} from './utils/ApiCalls'

import Chart from './components/Chart'

function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()
  const [last90Days, setLast90Days] = useState()
  const [symbol, setSymbol] = useState('ETH')
  const [allCurrencies, setAllCurrencies] = useState()

  useEffect(() => {
    const getData = async () => {
      await getExchangeRate(setExchangeRate)
      await getCurrencies(setAllCurrencies)
    }
    getData()
  }, [])

  useEffect(() => {
    getEthPriceUSD(setEthPrice)
    const interval = setInterval(() => {
      getEthPriceUSD(setEthPrice)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const chartData = {
    labels:
      last90Days &&
      last90Days.data.map((data) => {
        return data.timestamp
      }),
    datasets:
      last90Days &&
      last90Days.data.map((data) => {
        return data.closingPrice
      }),
    symbol: last90Days && last90Days.symbol,
  }

  return (
    <>
      <h1>
        ETH: {ethPrice && numberWithCommas(ethPrice)} USD{' '}
        {exchangeRate &&
          numberWithCommas((exchangeRate.rates.CAD * ethPrice).toFixed(2))}{' '}
        CAD
      </h1>
      <form onSubmit={(e) => getLast90Days(e, symbol, setLast90Days)}>
        <label htmlFor="coins">Choose a coin:</label>
        <select
          name="coins"
          id="coins"
          defaultValue={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          {allCurrencies &&
            allCurrencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              )
            })}
        </select>
        <input type="submit" value="Get Data"></input>
      </form>
      {last90Days && <Chart chartData={chartData} />}
    </>
  )
}

export default App
