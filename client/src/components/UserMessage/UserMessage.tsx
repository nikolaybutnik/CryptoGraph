// Libraries
import React from 'react'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { BiMessageError } from 'react-icons/bi'

// Styles
import '../../css/UserMessage.css'

interface Props {
  props: {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
  }
}

const UserMessage: React.FC<Props> = ({ props: { message, setMessage } }) => {
  return (
    <div className="userMessage">
      <BiMessageError size={25} />
      <div>{message}</div>
      <AiOutlineCloseSquare
        className="dismissMessageBtn"
        size={20}
        onClick={() => setMessage('')}
      />
    </div>
  )
}

export default UserMessage
