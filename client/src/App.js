import React, { useEffect, useState } from 'react'
import './App.css'

import { getEthPriceUSD, getExchangeRate } from './utils/ApiCalls'

function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

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

  return (
    <>
      <h1>
        ETH: {ethPrice && numberWithCommas(ethPrice)} USD{' '}
        {exchangeRate &&
          numberWithCommas((exchangeRate.rates.CAD * ethPrice).toFixed(2))}{' '}
        CAD
      </h1>
    </>
  )
}

export default App
