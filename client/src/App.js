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
  const [symbol, setSymbol] = useState()
  const [pairSymbol, setPairSymbol] = useState()

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
          symbol,
          setSymbol,
          pairSymbol,
          setPairSymbol,
        }}
      />

      {graphData && (
        <>
          <div className="chart">
            <Chart graphData={graphData} />
          </div>

          <div className="chartControls">
            {/* <button
              className="chartControlBtn"
              onClick={() => console.log('placeholder for getGraphData')}
            >
              1min
            </button>
            <button
              className="chartControlBtn"
              onClick={() => console.log('placeholder for getGraphData')}
            >
              30min
            </button>
            <button
              className="chartControlBtn"
              onClick={() => console.log('placeholder for getGraphData')}
            >
              1hr
            </button>
            <button
              className="chartControlBtn"
              onClick={() => console.log('placeholder for getGraphData')}
            >
              1d
            </button> */}
            <button
              className="chartControlBtn"
              onClick={(e) => {
                // console.log(e.target)
                getGraphData(symbol, pairSymbol, setGraphData, '7days', '1d')
              }}
            >
              1wk
            </button>
            <button
              className="chartControlBtn"
              onClick={(e) => {
                // console.log(e.target)
                getGraphData(symbol, pairSymbol, setGraphData, '30days', '1d')
              }}
            >
              1mn
            </button>
            <button
              className="chartControlBtn threeMonths"
              onClick={(e) => {
                // console.log(e.target)
                getGraphData(symbol, pairSymbol, setGraphData, '90days', '1d')
              }}
            >
              3mn
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
