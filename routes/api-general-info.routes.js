const router = require('express').Router()
const axios = require('axios')

// Get current ETH/USD price
// Payload sent: {status: string, message: string, result: {ethbtc: string, ethbtc_timestamp: string, ethusd: string, ethusd_timestamp: string}}}
router.get('/ethprice', async (req, res) => {
  axios
    .get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    )
    .then((data) => {
      const retrievedData = data.data
      res.status(200).send({ data: retrievedData })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

// Get USD/CAD conversion
// Payload sent: {USD_CAD: number}
router.get('/exchangerate', async (req, res) => {
  axios
    .get(
      `https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=${process.env.REACT_APP_CURRENCY_EXCHANGE_API}`
    )
    .then((data) => {
      const retrievedData = data.data
      res.status(200).send({ data: retrievedData })
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

module.exports = router
