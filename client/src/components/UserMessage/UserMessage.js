import React from 'react'
import './UserMessage.css'

import { AiOutlineCloseSquare } from 'react-icons/ai'
import { BiMessageError } from 'react-icons/bi'

const UserMessage = ({ props: { message, setMessage } }) => {
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
