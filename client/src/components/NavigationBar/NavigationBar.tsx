// Libraries
import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown } from 'react-bootstrap'

// Components
import MarketDropdownItem from './MarketDropdownItem/MarketDropdownItem'
import FiatDropdownItem from './FiatDropdownItem/FiatDropdownItem'

// Utilities
import { SymbolData, Currency, Favorite, Exchange } from '../../utils/types'
import { getCurrencyData } from '../../utils/ServerCalls'
import exchanges from '../../utils/exchanges'

// Styles
import '../../css/NavigationBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface Props {
  props: {
    setMessage: React.Dispatch<React.SetStateAction<string>>
    favStatus: boolean
    setSymbolData: React.Dispatch<React.SetStateAction<SymbolData | null>>
    setSymbol: React.Dispatch<React.SetStateAction<string>>
    setPairSymbol: React.Dispatch<React.SetStateAction<string | null>>
    favorites: Favorite[]
    setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>
    toggleMarketData: Exchange[]
    setToggleMarketData: React.Dispatch<React.SetStateAction<Exchange[]>>
    currency: Currency
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
  }
}

const NavigationBar: React.FC<Props> = ({
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
    { countryCode: 'US', fiat: 'USD', location: 'United States (USD)' },
    { countryCode: 'CA', fiat: 'CAD', location: 'Canada (CAD)' },
    { countryCode: 'EU', fiat: 'EUR', location: 'Europe (EUR)' },
    { countryCode: 'GB', fiat: 'GBP', location: 'United Kingdom (GBP)' },
    { countryCode: 'JP', fiat: 'JPY', location: 'Japan (JPY)' },
    { countryCode: 'CN', fiat: 'CNY', location: 'China (CNY)' },
    { countryCode: 'HK', fiat: 'HKD', location: 'Hong Kong (HKD)' },
    { countryCode: 'CH', fiat: 'CHF', location: 'Switzerland (CHF)' },
  ]

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('userFavorites') || '{}'))
  }, [favStatus, setFavorites])

  const handleFetchGraph = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.target as HTMLAnchorElement
    const [symbol, pair]: string[] = button.textContent!.split('/')
    setSymbol(symbol) // Note: available pairs are auto fetched on setSymbol in SearchForm.tsx
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
              favorites.map((item: { symbol: string; pair: string }) => {
                return (
                  <NavDropdown.Item
                    key={`${item.symbol}/${item.pair}`}
                    onClick={handleFetchGraph}
                  >{`${item.symbol}/${item.pair}`}</NavDropdown.Item>
                )
              })}
          </NavDropdown>
          <NavDropdown title="Exchanges" id="collasible-nav-dropdown">
            {exchanges.map((exchange) => {
              const marketName = exchange.name
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
