import React from 'react'
import { Exchange } from '../../../utils/types'
import { BiRightArrow } from 'react-icons/bi'

interface Props {
  index: number
  graphData: any
  toggleMarketData: Exchange[]
  name: string
  trading: string
  link: string
}

const tradingStatusLabel: React.FC<Props> = ({
  index,
  graphData,
  toggleMarketData,
  name,
  trading,
  link,
}) => {
  return (
    <>
      {toggleMarketData[index][name] === 1 && (
        <>
          {graphData[trading] ? (
            <a href={link} target="_blank" rel="noreferrer">
              <p
                style={{
                  backgroundColor: '#cdf584',
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                className="isTrading"
              >
                <img
                  style={{
                    height: '20px',
                  }}
                  src={`images/${name.toLowerCase()}-logo.png`}
                  alt={`${name} Logo`}
                />{' '}
                {name.toUpperCase()}{' '}
                <BiRightArrow className="marketplaceLink" />
              </p>
            </a>
          ) : (
            <p
              style={{
                backgroundColor: '#fffd9e',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              className="isNotTrading"
            >
              <img
                style={{
                  height: '20px',
                }}
                src={`images/${name.toLowerCase()}-logo.png`}
                alt={`${name} Logo`}
              />{' '}
              {name.toUpperCase()}{' '}
            </p>
          )}
        </>
      )}
    </>
  )
}

export default tradingStatusLabel
