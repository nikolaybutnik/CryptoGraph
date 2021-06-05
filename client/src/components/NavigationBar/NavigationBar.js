import React, { useEffect } from 'react'
import { getCurrencyData } from '../../utils/ServerCalls'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'
import './NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { getPairs } from '../../utils/ServerCalls'

const NavigationBar = ({
  props: {
    favStatus,
    setSymbolData,
    setSymbol,
    setPairSymbol,
    favorites,
    setFavorites,
    setPairOptions,
  },
}) => {
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favStatus, setFavorites])

  const handleFetchGraph = (e) => {
    const [symbol, pair] = e.target.textContent.split('/')
    setSymbol(symbol)
    setPairSymbol(pair)
    getCurrencyData(symbol, setSymbolData)
    getPairs(symbol, setPairOptions)
  }

  return (
    <Navbar collapseOnSelect className="colorNav" expand="sm" variant="light">
      <Navbar.Brand href="/">CryptoGraph</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Favorites" id="collasible-nav-dropdown">
            {favorites && favorites.length === 0 && (
              <NavDropdown.Item>You have no favorites saved</NavDropdown.Item>
            )}
            {favorites &&
              favorites.map((item) => {
                return (
                  <NavDropdown.Item
                    key={`${item.symbol}/${item.pair}`}
                    onClick={(e) => handleFetchGraph(e)}
                  >{`${item.symbol}/${item.pair}`}</NavDropdown.Item>
                )
              })}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
