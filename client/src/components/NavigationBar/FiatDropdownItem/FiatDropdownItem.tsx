import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'

import { getExchangeRate } from '../../../utils/ServerCalls'

interface Props {
  props: {
    setCurrency: (value: { currency: string; exchange: number }) => void
    setMessage: (value: string) => void
    item: {
      countryCode: string
      fiat: string
      location: string
    }
  }
}

const FiatDropdownItem = ({
  props: { setCurrency, setMessage, item },
}: Props) => {
  const handleSetCurrency = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.target as HTMLAnchorElement
    const newCurrency = button.children[0].getAttribute('value')
    getExchangeRate(newCurrency, setCurrency, setMessage)
  }

  return (
    <NavDropdown.Item
      onClick={
        item.fiat === 'USD'
          ? () => setCurrency({ currency: 'USD', exchange: 1 })
          : handleSetCurrency
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
