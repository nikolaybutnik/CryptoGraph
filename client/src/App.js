import React, { useState, useEffect } from 'react'
import './App.css'

import { getGraphData } from './utils/ServerCalls'
import markets from './utils/markets'

import Graph from './components/Graph/Graph'
import SearchForm from './components/SearchForm/SearchForm'
import EthBtcPrice from './components/EthBtcPrice/EthBtcPrice'
import GraphControls from './components/GraphControls/GraphControls'
import NavigationBar from './components/NavigationBar/NavigationBar'
import CoinInfo from './components/CoinInfo/CoinInfo'

const App = () => {
  // states for data related to ETH and BTC prices and CAD exchange rate
  const [exchangeRate, setExchangeRate] = useState(0)
  const [ethPrice, setEthPrice] = useState('')
  const [btcPrice, setBtcPrice] = useState('')
  // state for all available currencies across all available marketplaces
  const [allCurrencies, setAllCurrencies] = useState({})
  // states for the currently selected symbol and pair
  const [symbol, setSymbol] = useState('')
  const [pairSymbol, setPairSymbol] = useState('')
  const [pairOptions, setPairOptions] = useState([])
  // state for additional data for currently selected symbol
  const [symbolData, setSymbolData] = useState({})
  // states for the graph and controls
  const [graphData, setGraphData] = useState({})
  const [viewOption, setViewOption] = useState('1d')
  const [timeSpan, setTimeSpan] = useState('90days')
  // state for all currently save favorites
  const [favorites, setFavorites] = useState([])
  // state for the currently selected pair, used to figure out if it's saved to favorites
  const [favStatus, setFavStatus] = useState(false)
  // states for market toggle switches
  const marketData = markets.map((market) => {
    return { [market.name]: 1 }
  })
  // const testData = [{ Binance: 1 }, { KuCoin: 0 }, { Kraken: 1 }]
  const [toggleMarketData, setToggleMarketData] = useState(marketData)
  const [toggleBinanceData, setToggleBinanceData] = useState(true)
  const [toggleKucoinData, setToggleKucoinData] = useState(true)
  const [toggleKrakenData, setToggleKrakenData] = useState(true)

  // useEffect(() => {
  //   console.log(toggleMarketData)
  // }, [toggleMarketData])

  // Properties to be passed down to the various components
  const props = {
    exchangeRate,
    setExchangeRate,
    ethPrice,
    setEthPrice,
    btcPrice,
    setBtcPrice,
    getGraphData,
    allCurrencies,
    setAllCurrencies,
    symbol,
    setSymbol,
    pairSymbol,
    setPairSymbol,
    pairOptions,
    setPairOptions,
    symbolData,
    setSymbolData,
    graphData,
    setGraphData,
    viewOption,
    setViewOption,
    timeSpan,
    setTimeSpan,
    favorites,
    setFavorites,
    favStatus,
    setFavStatus,
    toggleBinanceData,
    setToggleBinanceData,
    toggleKucoinData,
    setToggleKucoinData,
    toggleKrakenData,
    setToggleKrakenData,
    toggleMarketData,
    setToggleMarketData,
  }

  useEffect(() => {
    if (!localStorage.getItem('userFavorites')) {
      localStorage.setItem('userFavorites', '[]')
    }
  }, [])

  // const getTestData = () => {
  //   // Binance timeframes: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h,
  //   // 6h, 8h, 12h, 1d, 3d, 1w, 1M
  //   // KuCoin timeframes: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h,
  //   // 6h, 8h, 12h, 1d, 1w
  //   fetch(`/testdata/ADA/ETH/7days/1m`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const timestamps = data.data.map((x) => {
  //         return format(x, 'm')
  //       })
  //       console.log(timestamps)
  //     })
  //     .catch((err) => console.log(err))
  // }

  return (
    <>
      <NavigationBar props={props} />

      <div className="mainContainer">
        <EthBtcPrice props={props} />

        <SearchForm props={props} />

        {/* <button onClick={() => getTestData()}>Test Button</button> */}

        {/* Graph rendered if graphData is not an empty object */}
        {graphData && Object.keys(graphData).length !== 0 && (
          <div className="graphInfoContainer">
            <div className="graph">
              <Graph props={props} />
              <GraphControls props={props} />
            </div>
            <CoinInfo props={props} />
          </div>
        )}
      </div>
    </>
  )
}

export default App
