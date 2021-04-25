import React, { useState, useEffect } from 'react'
import './Favorites.css'

const Favorites = ({ favStatus }) => {
  const [favoritesToggle, setFavoritesToggle] = useState(false)
  const [favorites, setFavorites] = useState()

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favoritesToggle, favStatus])

  return (
    <div className="favorites">
      <button onClick={() => setFavoritesToggle(!favoritesToggle)}>
        Favorites
      </button>
      {favoritesToggle &&
        favorites &&
        favorites.map((item) => (
          <div
            key={`${item.symbol}/${item.pair}`}
          >{`${item.symbol}/${item.pair}`}</div>
        ))}
    </div>
  )
}

export default Favorites
