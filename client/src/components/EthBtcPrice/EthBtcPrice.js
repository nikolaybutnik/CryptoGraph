import React, { useEffect } from 'react'
import './EthBtcPrice.css'

import {
  getEthPriceUSD,
  getBtcPriceUSD,
  getExchangeRate,
  getCurrencyData,
  getPairs,
} from '../../utils/ServerCalls'
import { numberWithCommas } from '../../utils/HelperFunctions'

const EthPrice = ({
  props: {
    exchangeRate,
    setExchangeRate,
    ethPrice,
    setEthPrice,
    btcPrice,
    setBtcPrice,
    setSymbolData,
    setSymbol,
    setPairSymbol,
    setPairOptions,
    toggleMarketData,
  },
}) => {
  useEffect(() => {
    const getData = async () => {
      await getExchangeRate(setExchangeRate)
    }
    getData()
  }, [setExchangeRate])

  // Update ETH and BTC price every 5 seconds
  useEffect(() => {
    getEthPriceUSD(setEthPrice)
    getBtcPriceUSD(setBtcPrice)
    const interval = setInterval(() => {
      getEthPriceUSD(setEthPrice)
      getBtcPriceUSD(setBtcPrice)
    }, 5000)
    return () => clearInterval(interval)
  }, [setBtcPrice, setEthPrice])

  return (
    <div className="ethBtcInfo">
      <div
        className="ethInfo"
        onClick={() => {
          setSymbol('ETH')
          setPairSymbol('USDT')
          getCurrencyData('ETH', setSymbolData)
          getPairs('ETH', setPairOptions, toggleMarketData)
        }}
      >
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png"
          alt="Ethereum Logo"
          style={{ marginRight: '5px' }}
        />
        <h2>Ethereum</h2>
        <div>
          <div>{ethPrice && numberWithCommas(ethPrice)} USD</div>
          {exchangeRate !== 0 && (
            <div>
              {numberWithCommas((exchangeRate * ethPrice).toFixed(2))} CAD
            </div>
          )}
        </div>
      </div>
      <div
        className="btcInfo"
        onClick={() => {
          setSymbol('BTC')
          setPairSymbol('USDT')
          getCurrencyData('BTC', setSymbolData)
          getPairs('BTC', setPairOptions, toggleMarketData)
        }}
      >
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png"
          alt="Bitcoin Logo"
          style={{ marginRight: '5px' }}
        />
        <h2>Bitcoin</h2>
        <div>
          <div>{btcPrice && numberWithCommas(btcPrice)} USD</div>
          {exchangeRate !== 0 && (
            <div>
              {numberWithCommas((exchangeRate * btcPrice).toFixed(2))} CAD
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EthPrice
