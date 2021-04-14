import React, { useEffect, useState } from 'react'
import './EthPrice.css'

import { getEthPriceUSD, getExchangeRate } from '../../utils/ServerCalls'

const EthPrice = () => {
  const [exchangeRate, setExchangeRate] = useState()
  const [ethPrice, setEthPrice] = useState()

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
  )
}

export default EthPrice
