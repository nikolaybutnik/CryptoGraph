import React, { useEffect, useState } from 'react'
import './App.css'

import { getEthPrice } from './utils/ApiCalls'

function App() {
  const [ethPrice, setEthPrice] = useState()

  useEffect(() => {
    getEthPrice(setEthPrice)
    const interval = setInterval(() => {
      getEthPrice(setEthPrice)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <h1>ETH: {ethPrice} USD</h1>
    </>
  )
}

export default App
