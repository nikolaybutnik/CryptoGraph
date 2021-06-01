import { numberWithCommas } from './HelperFunctions'

test('Add commas to numbers', () => {
  expect(numberWithCommas(1000)).toBe('1,000')
})