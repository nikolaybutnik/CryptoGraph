// Libraries
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Loader from 'react-loader-spinner'

// Utilities
import {
  getCurrencies,
  getPairs,
  getCurrencyData,
} from '../../utils/ServerCalls'
import { SymbolData, Options, GraphData, Exchange } from '../../utils/types'

// Styles
import '../../css/SearchForm.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

interface Props {
  props: {
    getGraphData: (
      symbol: string,
      pairSymbol: string,
      func: React.Dispatch<React.SetStateAction<GraphData | null>>,
      timeRange: string,
      interval: string,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void
    setGraphData: React.Dispatch<React.SetStateAction<GraphData | null>>
    symbol: string
    setSymbol: React.Dispatch<React.SetStateAction<string>>
    pairSymbol: string | null
    setPairSymbol: React.Dispatch<React.SetStateAction<string | null>>
    setSymbolData: React.Dispatch<React.SetStateAction<SymbolData | null>>
    viewOption: string
    pairOptions: Options[]
    setPairOptions: React.Dispatch<React.SetStateAction<Options[]>>
    allCurrencies: Options[]
    setAllCurrencies: React.Dispatch<React.SetStateAction<Options[]>>
    timeSpan: string
    toggleMarketData: Exchange[]
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
