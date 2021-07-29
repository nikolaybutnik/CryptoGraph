import React, { useEffect, useState, useRef } from 'react'
import Chart from 'chart.js/auto'
import './Graph.css'

import { filterDatasets } from '../../utils/HelperFunctions'

import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineCheckCircle,
  AiOutlineWarning,
} from 'react-icons/ai'
import { BiRightArrow } from 'react-icons/bi'

import { GraphData, Exchange } from '../../utils/types'

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
    if (
      checkIfFavorite.some(
        (item) => item.symbol === symbol && item.pair === pairSymbol
      )
    ) {
      setFavStatus(true)
    } else {
      setFavStatus(false)
    }
  }, [symbol, pairSymbol, setFavStatus])

  // Graph rendering
  useEffect(() => {
    const ctx = graphRef.current?.getContext('2d')

    let labels: string[] = []
    // Note: down the road, redo logic to allow for working with more marketplaces.
    // Idea: select the longest array and use it for labels.
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
          datasets: filterDatasets(graphData, toggleMarketData),
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
        datasets: filterDatasets(graphData, toggleMarketData),
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
        {toggleMarketData[0].Binance === 1 && (
          <>
            {graphData?.isTradingBinance ? (
              <a
                href={`https://www.binance.com/en/trade/${symbol}_${pairSymbol}?layout=pro&type=spot`}
                target="_blank"
                rel="noreferrer"
              >
                <p style={{ backgroundColor: '#cdf584' }} className="isTrading">
                  <AiOutlineCheckCircle size={20} /> This pair is trading on
                  Binance <BiRightArrow className="marketplaceLink" />
                </p>
              </a>
            ) : (
              <p
                style={{ backgroundColor: '#fffd9e' }}
                className="isNotTrading"
              >
                <AiOutlineWarning size={20} /> This pair is not trading on
                Binance
              </p>
            )}
          </>
        )}
        {toggleMarketData[1].KuCoin === 1 && (
          <>
            {graphData?.isTradingKucoin ? (
              <a
                href={`https://trade.kucoin.com/${symbol}-${pairSymbol}`}
                target="_blank"
                rel="noreferrer"
              >
                <p style={{ backgroundColor: '#cdf584' }} className="isTrading">
                  <AiOutlineCheckCircle size={20} /> This pair is trading on
                  KuCoin <BiRightArrow className="marketplaceLink" />
                </p>
              </a>
            ) : (
              <p
                style={{ backgroundColor: '#fffd9e' }}
                className="isNotTrading"
              >
                <AiOutlineWarning size={20} /> This pair is not trading on
                Kucoin
              </p>
            )}
          </>
        )}
        {toggleMarketData[2].Kraken === 1 && (
          <>
            {graphData?.isTradingKraken ? (
              <a
                href={`https://trade.kraken.com/charts/KRAKEN:${symbol}-${pairSymbol}`}
                target="_blank"
                rel="noreferrer"
              >
                <p style={{ backgroundColor: '#cdf584' }} className="isTrading">
                  <AiOutlineCheckCircle size={20} /> This pair is trading on
                  Kraken <BiRightArrow className="marketplaceLink" />
                </p>
              </a>
            ) : (
              <p
                style={{ backgroundColor: '#fffd9e' }}
                className="isNotTrading"
              >
                <AiOutlineWarning size={20} /> This pair is not trading on
                Kraken
              </p>
            )}
          </>
        )}
      </div>
      <canvas id="myGraph" ref={graphRef}></canvas>
    </>
  )
}

export default Graph
