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
  const [symbolData, setSymbolData] = useState()

  useEffect(() => {
    console.log(symbolData)
  }, [symbolData])

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

  const currentlySelectedSymbol = symbolData && symbolData.conversionData.symbol

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
          setSymbolData,
        }}
      />

      {graphData && (
        <div className="chartInfoContainer">
          <div className="chart">
            <Chart graphData={graphData} />
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
          </div>

          {symbolData && (
            <div className="info">
              <h3>{`${symbolData.generalData[currentlySelectedSymbol].name} (${symbolData.generalData[currentlySelectedSymbol].symbol})`}</h3>{' '}
              {symbolData.generalData[currentlySelectedSymbol]
                .twitter_username && (
                <a
                  target="blank"
                  href={`https://twitter.com/@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}
                >{`@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}</a>
              )}
              <div>
                <img
                  src={symbolData.generalData[currentlySelectedSymbol].logo}
                  alt={`${symbolData.generalData[currentlySelectedSymbol].name} Logo`}
                />
              </div>
              <h4>{`1 ${
                symbolData.generalData[currentlySelectedSymbol].symbol
              }: ${symbolData.conversionData.quote['USD'].price.toFixed(
                2
              )} USD`}</h4>
              <p>
                {symbolData.generalData[currentlySelectedSymbol].description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
