import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'

import { getExchangeRate } from '../../../utils/ServerCalls'

const FiatDropdownItem = ({ props: { setCurrency, setMessage, item } }) => {
  const handleSetCurrency = (e) => {
    const newCurrency = e.target.firstChild.getAttribute('value')
    getExchangeRate(newCurrency, setCurrency, setMessage)
  }

  return (
    <NavDropdown.Item
      onClick={
        item.fiat === 'USD'
          ? () => setCurrency({ currency: 'USD', exchange: 1 })
          : (e) => handleSetCurrency(e)
      }
    >
      {
        <ReactCountryFlag
          value={item.fiat}
          countryCode={item.countryCode}
          svg
        />
      }{' '}
      {item.location}
    </NavDropdown.Item>
  )
}

export default FiatDropdownItem
