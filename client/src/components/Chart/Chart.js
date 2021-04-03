import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ last90Days }) => {
  const labels = last90Days.binanceData.map((data) => {
    return data.timestamp
  })
  const binanceData = last90Days.binanceData
    ? last90Days.binanceData.map((data) => {
        return data.closingPrice
      })
    : null
  const kucoinData = last90Days.kucoinData
    ? last90Days.kucoinData.map((data) => {
        return data.closingPrice
      })
    : null
  const symbol = last90Days.symbol
  const pairSymbol = last90Days.pairSymbol

  kucoinData && console.log('YUPPERS')

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Binance: ${symbol}/${pairSymbol}`,
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
        label: `KuCoin: ${symbol}/${pairSymbol}`,
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
        {symbol}/{pairSymbol}: last 90 days
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
