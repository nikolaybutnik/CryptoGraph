import React, { useEffect } from 'react'
import './EthBtcPrice.css'

import {
  getEthPriceUSD,
  getBtcPriceUSD,
  getExchangeRate,
} from '../../utils/ServerCalls'

const EthPrice = ({
  props: {
    exchangeRate,
    setExchangeRate,
    ethPrice,
    setEthPrice,
    btcPrice,
    setBtcPrice,
  },
}) => {
  useEffect(() => {
    const getData = async () => {
      await getExchangeRate(setExchangeRate)
    }
    getData()
  }, [setExchangeRate])

  useEffect(() => {
    getEthPriceUSD(setEthPrice)
    getBtcPriceUSD(setBtcPrice)
    const interval = setInterval(() => {
      getEthPriceUSD(setEthPrice)
      getBtcPriceUSD(setBtcPrice)
    }, 5000)
    return () => clearInterval(interval)
  }, [setBtcPrice, setEthPrice])

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="ethBtcInfo">
      <div className="ethInfo">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png"
          alt="Ethereum Logo"
          style={{ marginRight: '5px' }}
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
      <div className="btcInfo">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png"
          alt="Bitcoin Logo"
          style={{ marginRight: '5px' }}
        />
        <h2>Bitcoin</h2>
        <div>
          <div>{btcPrice && numberWithCommas(btcPrice)} USD</div>
          {exchangeRate && (
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
