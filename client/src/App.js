import React, { useEffect, useState } from 'react'
import './App.css'

import {
  getEthPriceUSD,
  getExchangeRate,
  getGraphData,
} from './utils/ServerCalls'

import Chart from './components/Chart/Chart'
import SearchForm from './components/SearchForm/SearchForm'

function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()
  const [graphData, setGraphData] = useState()

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
    <div className="container">
      <h1>
        ETH: {ethPrice && numberWithCommas(ethPrice)} USD{' '}
        {exchangeRate && numberWithCommas((exchangeRate * ethPrice).toFixed(2))}{' '}
        CAD
      </h1>

      <SearchForm
        props={{
          getGraphData,
          setGraphData,
        }}
      />

      {graphData && (
        <>
          <div className="chart">
            <Chart graphData={graphData} />
          </div>
          <div className="chartControls">
            <button>1min</button>
            <button>1hr</button>
            <button>1wk</button>
            <button>1mn</button>
            <button className="threeMonths">3mn</button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
