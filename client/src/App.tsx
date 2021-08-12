import React, { useState, useEffect } from 'react'
import './App.css'

import { getGraphData } from './utils/ServerCalls'
import exchanges from './utils/exchanges'

import Graph from './components/Graph/Graph'
import SearchForm from './components/SearchForm/SearchForm'
import EthBtcPrice from './components/EthBtcPrice/EthBtcPrice'
import GraphControls from './components/GraphControls/GraphControls'
import NavigationBar from './components/NavigationBar/NavigationBar'
import CoinInfo from './components/CoinInfo/CoinInfo'
import UserMessage from './components/UserMessage/UserMessage'

import {
  SymbolData,
  Options,
  GraphData,
  Currency,
  Favorite,
  Exchange,
} from './utils/types'

const App: React.FC = () => {
  // state for displaying user notifications
  const [message, setMessage] = useState<string>('')
  // states for data related to ETH and BTC prices and CAD exchange rate
  const [currency, setCurrency] = useState<Currency>({
    currency: 'USD',
    exchange: 1,
  })
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [btcPrice, setBtcPrice] = useState<string>('')
  // state for all available currencies across all available marketplaces
  const [allCurrencies, setAllCurrencies] = useState<Options[]>([])
  // states for the currently selected symbol and pair
  const [symbol, setSymbol] = useState<string>('')
  const [pairSymbol, setPairSymbol] = useState<string | null>('')
  const [pairOptions, setPairOptions] = useState<Options[]>([])
  // state for additional data for currently selected symbol
  const [symbolData, setSymbolData] = useState<SymbolData | null>(null)
  // states for the graph and controls
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [viewOption, setViewOption] = useState<string>('1d')
  const [timeSpan, setTimeSpan] = useState<string>('90days')
  // state for all currently save favorites
  const [favorites, setFavorites] = useState<Favorite[]>([])
  // state for the currently selected pair, used to figure out if it's saved to favorites
  const [favStatus, setFavStatus] = useState<boolean>(false)
  // states for market toggle switches
  const exchangeData = exchanges.map((exchange) => {
    return { [exchange.name]: 1 }
  })
  const [toggleMarketData, setToggleMarketData] =
    useState<Exchange[]>(exchangeData)

  // Properties to be passed down to the various components
  const props = {
    message,
    setMessage,
    currency,
    setCurrency,
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
      {message && <UserMessage props={props} />}

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
