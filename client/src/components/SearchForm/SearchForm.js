import React, { useState, useEffect } from 'react'
import './SearchForm.css'

import Select from 'react-select'
import { HiOutlineSearchCircle } from 'react-icons/hi'

import { getCurrencies, getPairs } from '../../utils/ServerCalls'

const SearchForm = ({ props: { getLast90Days, setLast90Days } }) => {
  const [symbol, setSymbol] = useState()
  const [pairSymbol, setPairSymbol] = useState()
  const [allCurrencies, setAllCurrencies] = useState()
  const [pairOptions, setPairOptions] = useState()

  useEffect(() => {
    const getData = async () => {
      await getCurrencies(setAllCurrencies)
    }
    getData()
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (symbol && pairSymbol) {
      getLast90Days(symbol, pairSymbol, setLast90Days)
    } else {
      console.log(symbol, pairSymbol, 'NOPE')
    }
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <div className="searchFormContainer">
        <div>
          <label htmlFor="coins">CURRENCY:</label>
          <div className="searchBar">
            <Select
              name="coins"
              id="coins"
              options={allCurrencies && allCurrencies}
              onChange={(e) => {
                setSymbol(e.value)
                getPairs(e.value, setPairOptions)
                setPairSymbol(null)
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="coinPair">PAIR:</label>
          <div className="searchBar">
            <Select
              name="coinPair"
              id="coinPair"
              value={{ label: pairSymbol }}
              isDisabled={!symbol && true}
              isLoading={!pairOptions && true}
              options={pairOptions && pairOptions}
              onChange={(e) => {
                setPairSymbol(e.value)
              }}
            />
          </div>
        </div>
        <button id="submitBtn" type="submit">
          <HiOutlineSearchCircle size={26} />
        </button>
      </div>
    </form>
  )
}

export default SearchForm
