import React, { useState, useEffect } from 'react'
import { getGraphData, getCurrencyData } from '../../utils/ServerCalls'
import './Favorites.css'

import { IoIosArrowForward } from 'react-icons/io'

const Favorites = ({ props: { favStatus, setGraphData, setSymbolData } }) => {
  const [favoritesToggle, setFavoritesToggle] = useState(false)
  const [favorites, setFavorites] = useState()
  const [favError, setFavError] = useState(false)

  useEffect(() => {
    setFavError(false)
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favoritesToggle, favStatus])

  const handleFetchGraph = (e) => {
    const [symbol, pair] = e.target.textContent.split('/')
    getGraphData(symbol, pair, setGraphData, '90days', '1d')
    getCurrencyData(symbol, setSymbolData)
  }

  const handleDisplayFavorites = () => {
    if (favorites.length === 0) {
      setFavError(true)
    } else {
      setFavError(false)
      setFavoritesToggle(!favoritesToggle)
    }
  }

  return (
    <div className="favorites">
      <button onClick={handleDisplayFavorites}>
        Favorites <IoIosArrowForward className="arrowRight" />
      </button>
      {favError && (
        <div className="errorMessage">You have no favorites, add some!</div>
      )}
      {favoritesToggle &&
        favorites &&
        favorites.map((item) => (
          <div
            key={`${item.symbol}/${item.pair}`}
            className="favItem"
            onClick={(e) => handleFetchGraph(e)}
          >{`${item.symbol}/${item.pair}`}</div>
        ))}
    </div>
  )
}

export default Favorites
