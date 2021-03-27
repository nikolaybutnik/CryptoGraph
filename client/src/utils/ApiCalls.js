const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const getEthPrice = (func) => {
  fetch('/api/ethprice', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json(res))
    .then((data) => {
      console.log(data.data.result.ethusd)
      func(numberWithCommas(data.data.result.ethusd))
    })
    .catch((err) => console.log(err))
}

export { getEthPrice }
