import React from 'react'
import { Bar } from 'react-chartjs-2'

const Chart = ({ labels, datasets }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'ETH/USDT',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: datasets,
      },
    ],
  }

  return (
    <div>
      <h2>Bar Example (custom size)</h2>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}

export default Chart
