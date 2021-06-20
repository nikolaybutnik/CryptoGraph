import { isToday, isYesterday } from 'date-fns'

// For visual aid only, comma every 3 digits
const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Logic which filters which datasets to display on the graph, to avoid empty data from being displayed
const filterDatasets = (
  graphData,
  toggleBinanceData,
  toggleKucoinData,
  toggleGateIoData
) => {
  let binanceData, kucoinData, gateIoData
  if (toggleBinanceData) {
    binanceData = graphData.binanceData
      ? graphData.binanceData.map((data) => {
          return data.closingPrice
        })
      : null
  } else binanceData = null
  if (toggleKucoinData) {
    kucoinData = graphData.kucoinData
      ? graphData.kucoinData.map((data) => {
          return data.closingPrice
        })
      : null
  } else kucoinData = null
  if (toggleGateIoData) {
    gateIoData = graphData.gateIoData
      ? graphData.gateIoData.map((data) => {
          return data.closingPrice
        })
      : null
  } else gateIoData = null

  // console.log(binanceData)
  // console.log(kucoinData)
  console.log(gateIoData)

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
    {
      label: 'Gate.io',
      data: gateIoData,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255, 210, 70, 0.4)',
      borderColor: 'rgba(255, 210, 70, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255, 210, 70, 1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255, 210, 70, 1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
  ]

  return datasets.filter((set) => set.data !== null)
}

// Check recency of last retrieved piece of data
const isCurrentlyTrading = (timestamp) => {
  if (timestamp) {
    if (isToday(timestamp) || isYesterday(timestamp)) {
      return true
    } else return false
  } else return false
}

export { numberWithCommas, filterDatasets, isCurrentlyTrading }
