import React from 'react'
import './UserMessage.css'

import { AiOutlineCloseSquare } from 'react-icons/ai'
import { BiMessageError } from 'react-icons/bi'

interface Props {
  props: {
    message: string
    setMessage: (value: string) => void
  }
}

const UserMessage = ({ props: { message, setMessage } }: Props) => {
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
