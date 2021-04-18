import React, { useEffect, useState } from 'react'
import './EthBtcPrice.css'

import {
  getEthPriceUSD,
  getBtcPriceUSD,
  getExchangeRate,
} from '../../utils/ServerCalls'

const EthPrice = () => {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()
  const [btcPrice, setBtcPrice] = useState()

  useEffect(() => {
    const getData = async () => {
      await getExchangeRate(setExchangeRate)
    }
    getData()
  }, [])

  useEffect(() => {
    getEthPriceUSD(setEthPrice)
    getBtcPriceUSD(setBtcPrice)
    const interval = setInterval(() => {
      getEthPriceUSD(setEthPrice)
      getBtcPriceUSD(setBtcPrice)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="ethBtcInfo">
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
      <div className="btcInfo">
        <img
          src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png"
          alt="Bitcoin Logo"
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
