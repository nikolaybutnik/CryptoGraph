import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

const MarketDropdownItem = ({
  props: { marketName, toggleMarketData, setToggleMarketData },
}) => {
  const toggleStatusObject = toggleMarketData.filter(
    (data) => Object.keys(data)[0] === marketName
  )
  const defaultToggleStatus =
    Object.values(toggleStatusObject[0])[0] === 1 ? true : false

  const updateState = () => {
    const updatedState = toggleMarketData.map((data) => {
      if (Object.keys(data)[0] === marketName) {
        return { [marketName]: Object.values(data)[0] === 1 ? 0 : 1 }
      } else return data
    })
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
