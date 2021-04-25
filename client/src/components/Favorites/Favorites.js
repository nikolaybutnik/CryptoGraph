import React, { useState, useEffect } from 'react'
import { getGraphData } from '../../utils/ServerCalls'
import './Favorites.css'

import { IoIosArrowForward } from 'react-icons/io'

const Favorites = ({ props: { favStatus, setGraphData } }) => {
  const [favoritesToggle, setFavoritesToggle] = useState(false)
  const [favorites, setFavorites] = useState()

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favoritesToggle, favStatus])

  const handleFetchGraph = (e) => {
    const [symbol, pair] = e.target.textContent.split('/')
    getGraphData(symbol, pair, setGraphData, '90days', '1d')
  }

  return (
    <div className="favorites">
      <button onClick={() => setFavoritesToggle(!favoritesToggle)}>
        Favorites <IoIosArrowForward className="arrowRight" />
      </button>
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
