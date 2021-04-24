import React, { useState } from 'react'
import './Favorites.css'

const Favorites = () => {
  const [favoritesToggle, setFavoritesToggle] = useState(false)

  return (
    <div className="favorites">
      <button onClick={() => setFavoritesToggle(!favoritesToggle)}>
        Favorites
      </button>
      {favoritesToggle && <div>Add favorites here</div>}
    </div>
  )
}

export default Favorites
