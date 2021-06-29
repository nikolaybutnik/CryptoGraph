import {
  filterDatasets,
  numberWithCommas,
  isCurrentlyTrading,
} from './HelperFunctions'

test('Correctly filters out null data', () => {
  const graphData = {
    symbol: 'ETH',
    pairSymbol: 'USDT',
    isTradingBinance: true,
    isTradingKucoin: false,
    isTradingKraken: false,
    binanceData: [],
    kucoinData: null,
    krakenData: null,
  }
  const toggleMarketData = [{ Binance: 1 }, { KuCoin: 1 }, { Kraken: 1 }]

  expect(filterDatasets(graphData, toggleMarketData)).toHaveLength(1)
})

test('Adds commas to numbers', () => {
  expect(numberWithCommas(1000000)).toBe('1,000,000')
  expect(numberWithCommas(1000)).toBe('1,000')
  expect(numberWithCommas(100)).toBe('100')
})

test('Date is today', () => {
  expect(isCurrentlyTrading(new Date())).toBe(true)
  expect(isCurrentlyTrading(new Date(2020, 11, 24, 10, 33, 30, 0))).toBe(false)
})
