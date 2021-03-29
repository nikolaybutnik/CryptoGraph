const getEthPriceUSD = (func) => {
  fetch('/api/ethprice', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json(res))
    .then((data) => {
      // console.log(data.data.result.ethusd)
      func(data.data.result.ethusd)
    })
    .catch((err) => console.log(err))
}

const getExchangeRate = (func) => {
  fetch('https://api.exchangeratesapi.io/latest?base=USD')
    .then((res) => res.json())
    .then((data) => {
      func(data)
    })
}

export { getEthPriceUSD, getExchangeRate }
