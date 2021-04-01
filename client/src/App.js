import React, { useEffect, useState } from 'react'
import './App.css'

import {
  getEthPriceUSD,
  getExchangeRate,
  getLast90Days,
} from './utils/ApiCalls'

import Chart from './components/Chart/Chart'
import SearchForm from './components/SearchForm/SearchForm'

function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()
  const [last90Days, setLast90Days] = useState()

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

  return (
    <>
      <h1>
        ETH: {ethPrice && numberWithCommas(ethPrice)} USD{' '}
        {exchangeRate && numberWithCommas((exchangeRate * ethPrice).toFixed(2))}{' '}
        CAD
      </h1>

      <SearchForm
        props={{
          getLast90Days,
          setLast90Days,
        }}
      />

      {last90Days && <Chart last90Days={last90Days} />}
    </>
  )
}

export default App
