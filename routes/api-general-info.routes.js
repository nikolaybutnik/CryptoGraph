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
      res.status(500).json(err)
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
      res.status(500).json(err)
    })
})

// Get general info and USD conversion data on the requested currency
// Payload sent {conversionData: {object}, generalData: {object}}
router.get('/currencydata/:symbol', async (req, res) => {
  const symbol = req.params.symbol
  const options = {
    headers: {
      'X-CMC_PRO_API_KEY': `${process.env.REACT_APP_CMC_API_KEY}`,
    },
  }
  try {
    const [conversionData, generalData] = await Promise.all([
      axios.get(
        `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?symbol=${symbol}&amount=1&convert=USD`,
        options
      ),
      axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${symbol}`,
        options
      ),
    ])
    res.send({
      conversionData: conversionData.data.data,
      generalData: generalData.data.data,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
