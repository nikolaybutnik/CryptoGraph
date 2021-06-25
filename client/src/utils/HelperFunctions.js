import { isToday, isYesterday } from 'date-fns'
import markets from './markets'

// For visual aid only, comma every 3 digits
const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Logic which filters which datasets to display on the graph, to avoid empty data from being displayed
const filterDatasets = (graphData, toggleMarketData) => {
  let binanceData, kucoinData, krakenData
  if (toggleMarketData[0].Binance === 1) {
    binanceData = graphData.binanceData
      ? graphData.binanceData.map((data) => {
          return data.closingPrice
        })
      : null
  } else binanceData = null
  if (toggleMarketData[1].KuCoin === 1) {
    kucoinData = graphData.kucoinData
      ? graphData.kucoinData.map((data) => {
          return data.closingPrice
        })
      : null
  } else kucoinData = null
  if (toggleMarketData[2].Kraken === 1) {
    krakenData = graphData.krakenData
      ? graphData.krakenData.map((data) => {
          return data.closingPrice
        })
      : null
  } else krakenData = null
  const dataArray = [binanceData, kucoinData, krakenData]

  const datasets = markets.map((market, index) => {
    return {
      label: market.name,
      data: dataArray[index],
      fill: false,
      lineTension: 0.1,
      backgroundColor: market.chartColor.secondary,
      borderColor: market.chartColor.primary,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: market.chartColor.primary,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: market.chartColor.primary,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  })

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
