import React from 'react'
import { Line } from 'react-chartjs-2'
import './Chart.css'

const Chart = ({ graphData }) => {
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
  const symbol = graphData.symbol
  const pairSymbol = graphData.pairSymbol

  const data = {
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
  }

  return (
    <div>
      <h2>
        {symbol}/{pairSymbol}
      </h2>
      <Line
        data={data}
        // width={100}
        // height={50}
        options={{
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 12,
                },
              },
            ],
          },
        }}
      />
    </div>
  )
}

export default Chart
