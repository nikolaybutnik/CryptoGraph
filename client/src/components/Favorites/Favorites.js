import React, { useState } from 'react'

const Favorites = () => {
  const [favoritesToggle, setFavoritesToggle] = useState(false)

  return (
    <>
      <button onClick={() => setFavoritesToggle(!favoritesToggle)}>
        Favorites
      </button>
      {favoritesToggle && <div>Add favorites here</div>}
    </>
  )
}

export default Favorites
