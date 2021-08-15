import React, { useEffect } from 'react'
import '../../css/EthBtcPrice.css'
import AnimatedNumber from 'animated-number-react'

import {
  getEthPriceUSD,
  getBtcPriceUSD,
  getCurrencyData,
  getPairs,
} from '../../utils/ServerCalls'
import { numberWithCommas } from '../../utils/HelperFunctions'

import { Currency, SymbolData, Options, Exchange } from '../../utils/types'

interface Props {
  props: {
    currency: Currency
    ethPrice: number
    setEthPrice: React.Dispatch<React.SetStateAction<number>>
    btcPrice: number
    setBtcPrice: React.Dispatch<React.SetStateAction<number>>
    setSymbolData: React.Dispatch<React.SetStateAction<SymbolData | null>>
    setSymbol: React.Dispatch<React.SetStateAction<string>>
    setPairSymbol: React.Dispatch<React.SetStateAction<string | null>>
    setPairOptions: React.Dispatch<React.SetStateAction<Options[]>>
    toggleMarketData: Exchange[]
  }
}

const EthPrice: React.FC<Props> = ({
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
}) => {
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

  // Function to format the animated into string on each change
  const formatValue = (value: number) => `${numberWithCommas(value.toFixed(2))}`

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
            {
              <AnimatedNumber
                value={ethPrice}
                formatValue={formatValue}
                duration={500}
              />
            }{' '}
            {currency.currency}
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
            {
              <AnimatedNumber
                value={btcPrice}
                formatValue={formatValue}
                duration={500}
              />
            }{' '}
            {currency.currency}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EthPrice
