const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const filterDatasets = (graphData) => {
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

  let datasets = [
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

  // ***This logic will need to be reworked as more markets are added.
  // Idea: filter the array and obtain a new array of objects where 'data' property is not 'null'
  if (binanceData && !kucoinData) {
    return [datasets[0]]
  } else if (kucoinData && !binanceData) {
    return [datasets[1]]
  } else {
    return datasets
  }
}

export { numberWithCommas, filterDatasets }
