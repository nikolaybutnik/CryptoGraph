import React, { useEffect, useState } from 'react'
import './App.css'

import {
  getEthPriceUSD,
  getExchangeRate,
  getGraphData,
} from './utils/ServerCalls'

import Chart from './components/Chart/Chart'
import SearchForm from './components/SearchForm/SearchForm'
import { format } from 'date-fns'

function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()
  const [graphData, setGraphData] = useState()
  const [symbol, setSymbol] = useState()
  const [pairSymbol, setPairSymbol] = useState()
  const [symbolData, setSymbolData] = useState()
  const [timeSpan, setTimeSpan] = useState('90days')
  const [viewOption, setViewOption] = useState('1d')

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

  const currentlySelectedSymbol =
    symbolData && symbolData.conversionData && symbolData.conversionData.symbol

  const getTestData = () => {
    // Binance timeframes: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h,
    // 6h, 8h, 12h, 1d, 3d, 1w, 1M
    fetch(`/testdata/ADA/ETH/7days/1m`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const timestamps = data.data.map((x) => {
          return format(x, 'm')
        })
        console.log(timestamps)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      <div className="ethInfo">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png"
          alt="Ethereum Logo"
        />
        <h2>Ethereum</h2>
        <div>
          <div>{ethPrice && numberWithCommas(ethPrice)} USD</div>
          {exchangeRate && (
            <div>
              {numberWithCommas((exchangeRate * ethPrice).toFixed(2))} CAD
            </div>
          )}
        </div>
      </div>

      <SearchForm
        props={{
          getGraphData,
          setGraphData,
          symbol,
          setSymbol,
          pairSymbol,
          setPairSymbol,
          setSymbolData,
          viewOption,
        }}
      />

      {/* <button onClick={() => getTestData()}>Test Button</button> */}

      {graphData && (
        <div className="chartInfoContainer">
          <div className="chart">
            <Chart graphData={graphData} />
            <div className="chartControls">
              <button
                className="chartControlBtn"
                onClick={() => {
                  setTimeSpan('7days')
                  getGraphData(
                    symbol,
                    pairSymbol,
                    setGraphData,
                    '7days',
                    viewOption
                  )
                }}
              >
                1wk
              </button>
              <button
                className="chartControlBtn"
                onClick={() => {
                  setTimeSpan('30days')
                  getGraphData(
                    symbol,
                    pairSymbol,
                    setGraphData,
                    '30days',
                    viewOption
                  )
                }}
              >
                1mn
              </button>
              <button
                className="chartControlBtn threeMonths"
                onClick={() => {
                  setTimeSpan('90days')
                  getGraphData(
                    symbol,
                    pairSymbol,
                    setGraphData,
                    '90days',
                    viewOption
                  )
                }}
              >
                3mn
              </button>

              <div className="viewOptions">
                <label htmlFor="viewOptions">Trading View: </label>
                <select
                  name="viewOptions"
                  onChange={(e) => {
                    setViewOption(e.target.value)
                    getGraphData(
                      symbol,
                      pairSymbol,
                      setGraphData,
                      timeSpan,
                      e.target.value
                    )
                  }}
                >
                  <option value="1d">1d</option>
                  <option value="12h">12h</option>
                  <option value="8h">8h</option>
                  <option value="4h">4h</option>
                  {/* <option value="1h">1h</option> */}
                </select>
              </div>
            </div>
          </div>

          {symbolData && symbolData.conversionData && (
            <div className="info">
              <div style={{ display: 'flex' }}>
                <img
                  style={{ alignSelf: 'center', marginRight: '5px' }}
                  src={symbolData.generalData[
                    currentlySelectedSymbol
                  ].logo.replace('64x64', '32x32')}
                  alt={`${symbolData.generalData[currentlySelectedSymbol].name} Logo`}
                />
                <h3>{`${symbolData.generalData[currentlySelectedSymbol].name} (${symbolData.generalData[currentlySelectedSymbol].symbol})`}</h3>{' '}
              </div>
              {symbolData.generalData[currentlySelectedSymbol]
                .twitter_username && (
                <a
                  target="blank"
                  href={`https://twitter.com/@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}
                >{`@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}</a>
              )}
              <h4>
                {symbolData.conversionData.quote['USD'].price
                  ? `1 ${
                      symbolData.generalData[currentlySelectedSymbol].symbol
                    }: ${symbolData.conversionData.quote['USD'].price.toFixed(
                      2
                    )} USD`
                  : 'Price information not available'}
              </h4>
              <p>
                {symbolData.generalData[currentlySelectedSymbol].description
                  ? symbolData.generalData[currentlySelectedSymbol].description
                  : 'Description not available'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
