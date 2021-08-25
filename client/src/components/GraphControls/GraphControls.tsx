// Libraries
import React from 'react'

// Styles
import '../../css/GraphControls.css'

interface Props {
  props: {
    setViewOption: React.Dispatch<React.SetStateAction<string>>
    timeSpan: string
    setTimeSpan: React.Dispatch<React.SetStateAction<string>>
  }
}

const GraphControls: React.FC<Props> = ({
  props: { setViewOption, timeSpan, setTimeSpan },
}) => {
  const graphOptions = [
    { timeSpan: '7days', timeDisplay: '1wk' },
    { timeSpan: '30days', timeDisplay: '1mn' },
    { timeSpan: '90days', timeDisplay: '3mn' },
  ]

  return (
    <div className="graphControls">
      {graphOptions.map((option) => {
        return (
          <button
            style={
              timeSpan === option.timeSpan
                ? { color: 'red' }
                : { color: 'grey' }
            }
            className="graphControlBtn"
            key={option.timeDisplay}
            onClick={() => {
              setTimeSpan(option.timeSpan)
            }}
          >
            {option.timeDisplay}
          </button>
        )
      })}

      <div className="viewOptions">
        <label htmlFor="viewOptions">Trading View: </label>
        <select
          name="viewOptions"
          onChange={(e) => {
            setViewOption(e.target.value)
          }}
        >
          <option value="1d">1d</option>
          <option value="12h">12h</option>
          <option value="8h">8h</option>
          <option value="4h">4h</option>
        </select>
      </div>
    </div>
  )
}

export default GraphControls
