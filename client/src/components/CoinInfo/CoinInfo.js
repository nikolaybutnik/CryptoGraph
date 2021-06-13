import React from 'react'
import './CoinInfo.css'

const CoinInfo = ({ props: { symbolData } }) => {
  const currentlySelectedSymbol =
    symbolData && symbolData.conversionData && symbolData.conversionData.symbol

  return (
    <div className="info">
      <div style={{ display: 'flex' }}>
        <img
          style={{ alignSelf: 'center', marginRight: '5px' }}
          src={symbolData.generalData[currentlySelectedSymbol].logo.replace(
            '64x64',
            '32x32'
          )}
          alt={`${symbolData.generalData[currentlySelectedSymbol].name} Logo`}
        />
        <h3>{`${symbolData.generalData[currentlySelectedSymbol].name} (${symbolData.generalData[currentlySelectedSymbol].symbol})`}</h3>{' '}
      </div>
      {symbolData.generalData[currentlySelectedSymbol].twitter_username && (
        <a
          target="blank"
          href={`https://twitter.com/@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}
        >{`@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}</a>
      )}
      <h4>
        {symbolData.conversionData.quote['USD'].price
          ? `1 ${
              symbolData.generalData[currentlySelectedSymbol].symbol
            }: ${symbolData.conversionData.quote['USD'].price.toFixed(2)} USD`
          : 'Price information not available'}
      </h4>
      {symbolData.generalData[currentlySelectedSymbol].description ? (
        <p>{symbolData.generalData[currentlySelectedSymbol].description}</p>
      ) : (
        <p>Description not available</p>
      )}
    </div>
  )
}

export default CoinInfo
