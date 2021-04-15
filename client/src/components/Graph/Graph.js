import React, { useEffect, useState, useRef } from 'react'
import Chart from 'chart.js'
import './Graph.css'

const Graph = ({ graphData }) => {
  const [newGraph, setNewGraph] = useState()
  const graphRef = useRef()

  useEffect(() => {
    const ctx = graphRef.current.getContext('2d')
    const graphInstance = new Chart(ctx, {})
    setNewGraph(graphInstance)
  }, [])

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

    // newGraph && console.log(newGraph.config.data)
    // const newData = newGraph && {
    //   labels: labels,
    //   datasets: [
    //     {
    //       label: binanceData ? 'Binance' : 'N/A',
    //       data: binanceData,
    //     },
    //     {
    //       label: kucoinData ? 'KuCoin' : 'N/A',
    //       data: kucoinData,
    //     },
    //   ],
    // }
    // newGraph && setNewGraph(...newGraph, newData)
    // newData && newGraph.update()

    const graphInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: binanceData ? 'Binance' : 'N/A',
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
            label: kucoinData ? 'KuCoin' : 'N/A',
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
        ],
      },
    })
  }, [graphData])

  const symbol = graphData.symbol
  const pairSymbol = graphData.pairSymbol

  return (
    <>
      <h2>
        {symbol}/{pairSymbol}
      </h2>
      <canvas id="myChart" ref={graphRef}></canvas>
    </>
  )
}

export default Graph
