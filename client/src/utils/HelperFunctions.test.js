import { numberWithCommas } from './HelperFunctions'

test('Add commas to numbers', () => {
  expect(numberWithCommas(1000000)).toBe('1,000,000')
  expect(numberWithCommas(1000)).toBe('1,000')
  expect(numberWithCommas(100)).toBe('100')
})
