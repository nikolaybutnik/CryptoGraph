import React, { useEffect } from 'react'
import './EthBtcPrice.css'

import {
  getEthPriceUSD,
  getBtcPriceUSD,
  getCurrencyData,
  getPairs,
} from '../../utils/ServerCalls'
import { numberWithCommas } from '../../utils/HelperFunctions'

import {
  CurrencyType,
  SymbolDataType,
  PairOptionsType,
} from '../../utils/types'

interface Props {
  props: {
    currency: CurrencyType
    ethPrice: string
    setEthPrice: (value: string) => void
    btcPrice: string
    setBtcPrice: (value: string) => void
    setSymbolData: (value: SymbolDataType) => void
    setSymbol: (value: string) => void
    setPairSymbol: (value: string) => void
    setPairOptions: (value: PairOptionsType[]) => void
    toggleMarketData: { [name: string]: number }[]
  }
}

const EthPrice = ({
  props: {
    currency,
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
}: Props) => {
  // Update ETH and BTC price every 5 seconds
  useEffect(() => {
    getEthPriceUSD(currency.exchange, setEthPrice)
    getBtcPriceUSD(currency.exchange, setBtcPrice)
    const interval = setInterval(() => {
      getEthPriceUSD(currency.exchange, setEthPrice)
      getBtcPriceUSD(currency.exchange, setBtcPrice)
    }, 5000)
    return () => clearInterval(interval)
  }, [currency.exchange, setBtcPrice, setEthPrice])

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
          <div>
            {ethPrice && numberWithCommas(ethPrice)} {currency.currency}
          </div>
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
          <div>
            {btcPrice && numberWithCommas(btcPrice)} {currency.currency}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EthPrice
