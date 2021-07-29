import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'

import { getExchangeRate } from '../../../utils/ServerCalls'

import { Currency } from '../../../utils/types'

interface Props {
  props: {
    setCurrency: React.Dispatch<React.SetStateAction<Currency>>
    setMessage: React.Dispatch<React.SetStateAction<string>>
    item: {
      countryCode: string
      fiat: string
      location: string
    }
  }
}

const FiatDropdownItem: React.FC<Props> = ({
  props: { setCurrency, setMessage, item },
}) => {
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
