import React, { useEffect } from 'react'
import './SearchForm.css'

import Select from 'react-select'

import {
  getCurrencies,
  getPairs,
  getCurrencyData,
} from '../../utils/ServerCalls'

const SearchForm = ({
  props: {
    getGraphData,
    setGraphData,
    symbol,
    setSymbol,
    pairSymbol,
    setPairSymbol,
    setSymbolData,
    viewOption,
    pairOptions,
    setPairOptions,
    allCurrencies,
    setAllCurrencies,
    timeSpan,
  },
}) => {
  // Initial call to populate dropdown will all available options
  useEffect(() => {
    const getData = async () => {
      await getCurrencies(setAllCurrencies)
    }
    getData()
  }, [setAllCurrencies])

  // Data is fetched only when both dropdown fields are populated
  useEffect(() => {
    if (symbol && pairSymbol) {
      getCurrencyData(symbol, setSymbolData)
      getGraphData(symbol, pairSymbol, setGraphData, timeSpan, viewOption)
    }
  }, [
    symbol,
    pairSymbol,
    setSymbolData,
    getGraphData,
    setGraphData,
    viewOption,
    timeSpan,
  ])

  return (
    <div className="searchFormContainer">
      <div>
        <label htmlFor="coins">CURRENCY:</label>
        <div className="searchBar">
          <Select
            name="coins"
            id="coins"
            options={allCurrencies && allCurrencies}
            value={{ value: symbol, label: symbol }}
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
    </div>
  )
}

export default SearchForm
