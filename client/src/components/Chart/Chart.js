import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ last90Days }) => {
  const labels = last90Days.data.map((data) => {
    return data.timestamp
  })
  const datasets = last90Days.data.map((data) => {
    return data.closingPrice
  })
  const symbol = last90Days.symbol
  const pairSymbol = last90Days.pairSymbol

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${symbol}/${pairSymbol}`,
        data: datasets,
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
