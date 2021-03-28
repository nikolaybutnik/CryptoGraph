import React, { useEffect, useState } from 'react'
import './App.css'

import { getEthPriceUSD, getExchangeRate } from './utils/ApiCalls'

function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()

  useEffect(() => {
    const getData = async () => {
      await getExchangeRate(setExchangeRate)
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

  const getChartData = () => {
    fetch('/api/chart', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json(res))
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <h1>
        ETH: {ethPrice && numberWithCommas(ethPrice)} USD{' '}
        {exchangeRate &&
          numberWithCommas((exchangeRate.rates.CAD * ethPrice).toFixed(2))}{' '}
        CAD
      </h1>
      <button onClick={getChartData}>Get Chart Data</button>
    </>
  )
}

export default App
