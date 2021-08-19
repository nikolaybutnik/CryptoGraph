// Libraries
import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import Chart from 'chart.js/auto'

// Components
import TradingStatusLabel from './TradingStatusLabel/TradingStatusLabel'

// Utilities
import { filterDatasets } from '../../utils/HelperFunctions'
import { GraphData, Exchange } from '../../utils/types'
import exchanges from '../../utils/exchanges'

// Styles
import '../../css/Graph.css'

interface Props {
  props: {
    graphData: GraphData | null
    favStatus: boolean
    setFavStatus: React.Dispatch<React.SetStateAction<boolean>>
    toggleMarketData: Exchange[]
  }
}

const Graph: React.FC<Props> = ({
  props: { graphData, favStatus, setFavStatus, toggleMarketData },
}) => {
  const [graph, setGraph] = useState<any>(null)
  const graphRef = useRef<HTMLCanvasElement | null>(null)

  const symbol = graphData?.symbol
  const pairSymbol = graphData?.pairSymbol

  // On graph render check if pair is fav'd to render empty or filled star icon
  useEffect(() => {
    const checkIfFavorite: { symbol: string; pair: string }[] = JSON.parse(
      localStorage.getItem('userFavorites') || '{}'
    )
    checkIfFavorite.some(
      (item) => item.symbol === symbol && item.pair === pairSymbol
    )
      ? setFavStatus(true)
      : setFavStatus(false)
  }, [symbol, pairSymbol, setFavStatus])

  // Graph rendering
  useEffect(() => {
    const ctx = graphRef.current?.getContext('2d')

    // Array of all available arrays that hold graph data, to be used in future for label generation
    // const graphDataArray: (
    //   | {
    //       timestamp: string
    //       closingPrice: number
    //     }[]
    //   | null
    //   | undefined
    // )[] = [graphData?.binanceData, graphData?.kucoinData, graphData?.krakenData]

    // Note: down the road, redo logic to allow for working with more marketplaces.
    // Idea: select the longest array and use it for labels.
    let labels: string[] = []
    if (graphData?.binanceData) {
      labels = graphData.binanceData.map((data) => {
        return data.timestamp
      })
    } else if (graphData?.kucoinData) {
      labels = graphData.kucoinData.map((data) => {
        return data.timestamp
      })
    } else if (graphData?.krakenData) {
      labels = graphData.krakenData.map((data) => {
        return data.timestamp
      })
    }

    // This operation sets the initial graph if one doesn't yet exist
    if (!graph) {
      const graphInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: filterDatasets(graphData!, toggleMarketData),
        },
        options: {
          scales: {
            xAxes: {
              ticks: {
                autoSkip: true,
                maxRotation: 90,
                minRotation: 90,
                maxTicksLimit: 10,
              },
            },
          },
        },
      })
      setGraph(graphInstance)
    }
    // This operation updates an existing graph if present
    else {
      graph.data = {
        labels: labels,
        datasets: filterDatasets(graphData!, toggleMarketData),
      }
      graph.update()
    }
  }, [graphData, graph, toggleMarketData])

  const toggleFavorite = (symbol: string, pairSymbol: string): void => {
    const newFavorite = { symbol: symbol, pair: pairSymbol }
    let currentFavorites: { symbol: string; pair: string }[] = JSON.parse(
      localStorage.getItem('userFavorites') || '{}'
    )
    if (
      currentFavorites.some(
        (item) => item.symbol === symbol && item.pair === pairSymbol
      )
    ) {
      const itemToRemove = currentFavorites.findIndex(
        (item) =>
          item.symbol === newFavorite.symbol && item.pair === newFavorite.pair
      )
      currentFavorites.splice(itemToRemove, 1)
      localStorage.setItem('userFavorites', JSON.stringify(currentFavorites))
      setFavStatus(false)
    } else {
      currentFavorites = [...currentFavorites, newFavorite]
      localStorage.setItem('userFavorites', JSON.stringify(currentFavorites))
      setFavStatus(true)
    }
  }

  return (
    <>
      <h2 className="pairTitle">
        {favStatus ? (
          <AiFillStar
            className="favIcon"
            onClick={() => {
              toggleFavorite(symbol!, pairSymbol!)
            }}
          />
        ) : (
          <AiOutlineStar
            className="favIcon"
            onClick={() => {
              toggleFavorite(symbol!, pairSymbol!)
            }}
          />
        )}
        {symbol}/{pairSymbol}
      </h2>
      <div className="tradingStatus">
        {exchanges.map((exchange) => {
          return (
            <TradingStatusLabel
              key={exchange.index}
              index={exchange.index}
              graphData={graphData}
              toggleMarketData={toggleMarketData}
              name={exchange.name}
              tradingStatusLabel={exchange.tradingStatusLabel}
              symbol={symbol}
              pairSymbol={pairSymbol}
            />
          )
        })}
      </div>
      <canvas id="myGraph" ref={graphRef}></canvas>
    </>
  )
}

export default Graph
