import React, { useEffect } from 'react'
import { getCurrencyData } from '../../utils/ServerCalls'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'
import './NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import markets from '../../utils/markets'
import MarketDropdownItem from './MarketDropdownItem/MarketDropdownItem'
import FiatDropdownItem from './FiatDropdownItem/FiatDropdownItem'

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
  const fiatCurrencies = [
    { countryCode: 'US', fiat: 'USD', location: 'United States' },
    { countryCode: 'CA', fiat: 'CAD', location: 'Canada' },
    { countryCode: 'EU', fiat: 'EUR', location: 'Europe' },
    { countryCode: 'GB', fiat: 'GBP', location: 'United Kingdom' },
    { countryCode: 'JP', fiat: 'JPY', location: 'Japan' },
    { countryCode: 'CN', fiat: 'CNY', location: 'China' },
    { countryCode: 'HK', fiat: 'HKD', location: 'Hong Kong' },
    { countryCode: 'CH', fiat: 'CHF', location: 'Switzerland' },
  ]

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites')))
  }, [favStatus, setFavorites])

  const handleFetchGraph = (e) => {
    const [symbol, pair] = e.target.textContent.split('/')
    setSymbol(symbol) // Note: available pairs are auto fetched on setSymbol in SearchForm.js
    setPairSymbol(pair)
    getCurrencyData(symbol, setSymbolData)
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
            {fiatCurrencies.map((item) => {
              return (
                <FiatDropdownItem
                  key={item.countryCode}
                  props={{ setCurrency, setMessage, item }}
                />
              )
            })}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
