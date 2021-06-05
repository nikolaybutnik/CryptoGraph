import React from 'react'
import { getGraphData } from '../../utils/ServerCalls'

import './GraphControls.css'

const GraphControls = ({
  props: {
    symbol,
    pairSymbol,
    setGraphData,
    viewOption,
    setViewOption,
    timeSpan,
    setTimeSpan,
  },
}) => {
  return (
    <div className="graphControls">
      <button
        className="graphControlBtn"
        onClick={() => {
          setTimeSpan('7days')
        }}
      >
        1wk
      </button>
      <button
        className="graphControlBtn"
        onClick={() => {
          setTimeSpan('30days')
        }}
      >
        1mn
      </button>
      <button
        className="graphControlBtn threeMonths"
        onClick={() => {
          setTimeSpan('90days')
        }}
      >
        3mn
      </button>

      {/* <div className="viewOptions">
        <label htmlFor="viewOptions">Trading View: </label>
        <select
          name="viewOptions"
          onChange={(e) => {
            setViewOption(e.target.value)
            getGraphData(
              symbol,
              pairSymbol,
              setGraphData,
              timeSpan,
              e.target.value
            )
          }}
        >
          <option value="1d">1d</option>
          <option value="12h">12h</option>
          <option value="8h">8h</option>
          <option value="4h">4h</option>
        </select>
      </div> */}
    </div>
  )
}

export default GraphControls
