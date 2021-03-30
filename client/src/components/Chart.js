import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({ labels, datasets }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'ETH/USDT',
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
  console.log(data)

  return (
    <div>
      <h2>Bar Example (custom size)</h2>
      <Line
        data={data}
        // width={100}
        // height={50}
        options={{
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                display: true,
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
