import React, { useState, useEffect } from 'react'
import './SearchForm.css'

import Select from 'react-select'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

import {
  getCurrencies,
  getPairs,
  getCurrencyData,
} from '../../utils/ServerCalls'

import {
  SymbolDataType,
  PairOptionsType,
  GraphDataType,
} from '../../utils/types'

interface Props {
  props: {
    getGraphData: (
      symbol: string,
      pairSymbol: string,
      func: (value: GraphDataType) => void,
      timeRange: string,
      interval: string,
      setLoading: (value: boolean) => void
    ) => void
    setGraphData: (value: GraphDataType) => void
    symbol: string
    setSymbol: (value: string) => void
    pairSymbol: string | null
    setPairSymbol: (value: string | null) => void
    setSymbolData: (value: SymbolDataType) => void
    viewOption: string
    pairOptions: PairOptionsType[]
    setPairOptions: (value: PairOptionsType[]) => void
    allCurrencies: { value: string; label: string }[]
    setAllCurrencies: (value: { value: string; label: string }[]) => void
    timeSpan: string
    toggleMarketData: { [name: string]: number }[]
  }
}

const SearchForm: React.FC<Props> = ({
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
    toggleMarketData,
  },
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  // Initial call to populate dropdown with all available options
  useEffect(() => {
    const getData = async () => {
      await getCurrencies(setAllCurrencies, toggleMarketData)
    }
    getData()
  }, [setAllCurrencies, toggleMarketData])

  // Update available pairs dynamically
  useEffect(() => {
    if (symbol) {
      getPairs(symbol, setPairOptions, toggleMarketData)
    }
  }, [setPairOptions, symbol, toggleMarketData])

  // Data is fetched only when both dropdown fields are populated
  useEffect(() => {
    if (symbol && pairSymbol) {
      setLoading(true)
      getCurrencyData(symbol, setSymbolData)
      getGraphData(
        symbol,
        pairSymbol,
        setGraphData,
        timeSpan,
        viewOption,
        setLoading
      )
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
            isDisabled={Object.keys(allCurrencies).length === 0 ? true : false}
            onChange={(e) => {
              setSymbol(e!.value)
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
              setPairSymbol(e!.label)
            }}
          />
        </div>
      </div>

      <div className="loading">
        <Loader
          type="Oval"
          color="#e2e2e2"
          visible={loading}
          height={38}
          width={38}
        />
      </div>
    </div>
  )
}

export default SearchForm
