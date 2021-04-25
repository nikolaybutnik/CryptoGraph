import React, { useState, useEffect } from 'react'
import { getGraphData } from '../../utils/ServerCalls'
import './Favorites.css'

import { IoIosArrowForward } from 'react-icons/io'

const Favorites = ({ favStatus }) => {
  const [favoritesToggle, setFavoritesToggle] = useState(false)
  const [favorites, setFavorites] = useState()

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favoritesToggle, favStatus])

  return (
    <div className="favorites">
      <button onClick={() => setFavoritesToggle(!favoritesToggle)}>
        Favorites <IoIosArrowForward />
      </button>
      {favoritesToggle &&
        favorites &&
        favorites.map((item) => (
          <div
            key={`${item.symbol}/${item.pair}`}
            className="favItem"
          >{`${item.symbol}/${item.pair}`}</div>
        ))}
    </div>
  )
}

export default Favorites
