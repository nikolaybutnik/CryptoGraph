import React, { useState, useEffect } from 'react'
import './SearchForm.css'

import Select from 'react-select'
import { HiOutlineSearchCircle } from 'react-icons/hi'

import { getCurrencies } from '../../utils/ServerCalls'

const SearchForm = ({ props: { getLast90Days, setLast90Days } }) => {
  const [symbol, setSymbol] = useState()
  const [allCurrencies, setAllCurrencies] = useState()

  useEffect(() => {
    const getData = async () => {
      await getCurrencies(setAllCurrencies)
    }
    getData()
  }, [])

  return (
    <form onSubmit={(e) => getLast90Days(e, symbol, setLast90Days)}>
      <div className="searchFormContainer">
        <div>
          <label htmlFor="coins">CURRENCY:</label>
          <div className="searchBar">
            <Select
              name="coins"
              id="coins"
              options={allCurrencies && allCurrencies}
              onChange={(e) => setSymbol(e.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="coinPair">PAIR:</label>
          <div className="searchBar">
            <Select
              name="coinPair"
              id="coinPair"
              options={allCurrencies && allCurrencies}
              onChange={(e) => setSymbol(e.value)}
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
