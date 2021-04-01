import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { getCurrencies } from '../../utils/ApiCalls'

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
      <label htmlFor="coins">Choose a coin:</label>
      <Select
        name="coins"
        id="coins"
        options={allCurrencies && allCurrencies}
        onChange={(e) => setSymbol(e.value)}
      />

      <input type="submit" value="Get Data"></input>
    </form>
  )
}

export default SearchForm
