// Libraries
import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import Toggle from 'react-toggle'

//Utilities
import { Exchange } from '../../../utils/types'

// Styles
import 'react-toggle/style.css'

interface Props {
  props: {
    marketName: string
    toggleMarketData: Exchange[]
    setToggleMarketData: React.Dispatch<React.SetStateAction<Exchange[]>>
  }
}

const MarketDropdownItem: React.FC<Props> = ({
  props: { marketName, toggleMarketData, setToggleMarketData },
}) => {
  const toggleStatusObject = toggleMarketData.filter(
    (data: { [name: string]: number }) => Object.keys(data)[0] === marketName
  )
  const defaultToggleStatus =
    Object.values(toggleStatusObject[0])[0] === 1 ? true : false

  const updateState = () => {
    const updatedState = toggleMarketData.map(
      (data: { [name: string]: number }) => {
        if (Object.keys(data)[0] === marketName) {
          return { [marketName]: Object.values(data)[0] === 1 ? 0 : 1 }
        } else return data
      }
    )
    setToggleMarketData(updatedState)
  }
  return (
    <NavDropdown.ItemText>
      <label htmlFor="marketStatus">{marketName}</label>
      <Toggle
        className="marketStatus"
        defaultChecked={defaultToggleStatus}
        onChange={() => updateState()}
      />
    </NavDropdown.ItemText>
  )
}

export default MarketDropdownItem
