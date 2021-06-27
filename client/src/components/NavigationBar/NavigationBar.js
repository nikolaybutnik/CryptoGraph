import React, { useEffect } from 'react'
import { getCurrencyData } from '../../utils/ServerCalls'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'
import './NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import markets from '../../utils/markets'
import MarketDropdownItem from './MarketDropdownItem/MarketDropdownItem'

import { getExchangeRate } from '../../utils/ServerCalls'

const NavigationBar = ({
  props: {
    setMessage,
    favStatus,
    setSymbolData,
    setSymbol,
    setPairSymbol,
    favorites,
    setFavorites,
    toggleMarketData,
    setToggleMarketData,
    currency,
    setCurrency,
  },
}) => {
  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favStatus, setFavorites])

  const handleFetchGraph = (e) => {
    const [symbol, pair] = e.target.textContent.split('/')
    setSymbol(symbol) // Note: available pairs are auto fetched on setSymbol in SearchForm.js
    setPairSymbol(pair)
    getCurrencyData(symbol, setSymbolData)
  }

  const handleSetCurrency = (e) => {
    const newCurrency = e.target.firstChild.getAttribute('value')
    getExchangeRate(newCurrency, setCurrency, setMessage)
  }

  return (
    <Navbar collapseOnSelect className="colorNav" expand="sm" variant="light">
      <Navbar.Brand href="/" className="appName">
        CryptoGraph
      </Navbar.Brand>
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
          <NavDropdown title="Markets" id="collasible-nav-dropdown">
            {markets.map((market) => {
              const marketName = market.name
              return (
                <MarketDropdownItem
                  key={marketName}
                  props={{ marketName, toggleMarketData, setToggleMarketData }}
                />
              )
            })}
          </NavDropdown>
          <NavDropdown title={currency.currency} id="collasible-nav-dropdown">
            <NavDropdown.Item
              onClick={() => setCurrency({ currency: 'USD', exchange: 1 })}
            >
              {<ReactCountryFlag value="USD" countryCode="US" svg />} United
              States
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => handleSetCurrency(e)}>
              {<ReactCountryFlag value="CAD" countryCode="CA" svg />} Canada
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
