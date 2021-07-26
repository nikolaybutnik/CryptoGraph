import { isToday, isYesterday } from 'date-fns'
import exchanges from './exchanges'

// For visual aid only, comma every 3 digits
const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Logic which filters which datasets to display on the graph, to avoid empty data from being displayed
const filterDatasets = (graphData, toggleMarketData) => {
  // Uses dynamic property names to check properties of retrieved graph data.
  // Only assembles graph if toggle is on and graph data is present
  const dataArray = exchanges.map((market, index) => {
    if (Object.values(toggleMarketData[index])[0] === 1) {
      return graphData[`${market.name.toLowerCase()}Data`]
        ? graphData[`${market.name.toLowerCase()}Data`].map(
            (data) => data.closingPrice
          )
        : null
    } else return null
  })

  const datasets = exchanges.map((market, index) => {
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
