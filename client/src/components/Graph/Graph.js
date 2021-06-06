import React, { useEffect, useState, useRef } from 'react'
import Chart from 'chart.js/auto'
import './Graph.css'

import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const Graph = ({ props: { graphData, favStatus, setFavStatus } }) => {
  const [graph, setGraph] = useState(null)
  const graphRef = useRef()

  const symbol = graphData.symbol
  const pairSymbol = graphData.pairSymbol

  useEffect(() => {
    const checkIfFavorite = JSON.parse(localStorage.getItem('userFavorites'))
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

  useEffect(() => {
    const ctx = graphRef.current.getContext('2d')

    let labels
    if (graphData.binanceData) {
      labels = graphData.binanceData.map((data) => {
        return data.timestamp
      })
    } else if (graphData.kucoinData) {
      labels = graphData.kucoinData.map((data) => {
        return data.timestamp
      })
    }

    const binanceData = graphData.binanceData
      ? graphData.binanceData.map((data) => {
          return data.closingPrice
        })
      : null
    const kucoinData = graphData.kucoinData
      ? graphData.kucoinData.map((data) => {
          return data.closingPrice
        })
      : null

    let datasetsTemplate = [
      {
        label: 'Binance',
        data: binanceData,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
      {
        label: 'KuCoin',
        data: kucoinData,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(202,73,73,0.4)',
        borderColor: 'rgba(202,73,73,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(202,73,73,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(202,73,73,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ]
    // If data from a market is missing, adjust the array to not display the missing dataset
    if (binanceData && !kucoinData) {
      datasetsTemplate = [datasetsTemplate[0]]
    } else if (kucoinData && !binanceData) {
      datasetsTemplate = [datasetsTemplate[1]]
    }
    console.log(datasetsTemplate)

    // This operation sets the initial graph if one doesn't yet exist
    if (!graph) {
      const graphInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasetsTemplate,
        },
      })
      setGraph(graphInstance)
    }
    // This operation updates an existing graph if present
    else {
      graph.data = {
        labels: labels,
        datasets: datasetsTemplate,
      }
      graph.update()
    }
  }, [graphData, graph])

  const toggleFavorite = (symbol, pairSymbol) => {
    const newFavorite = { symbol: symbol, pair: pairSymbol }
    let currentFavorites = JSON.parse(localStorage.getItem('userFavorites'))
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
              toggleFavorite(symbol, pairSymbol)
            }}
          />
        ) : (
          <AiOutlineStar
            className="favIcon"
            onClick={() => {
              toggleFavorite(symbol, pairSymbol)
            }}
          />
        )}
        {symbol}/{pairSymbol}
      </h2>
      <canvas id="myGraph" ref={graphRef}></canvas>
    </>
  )
}

export default Graph
