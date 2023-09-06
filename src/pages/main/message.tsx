import React from 'react'
import { Message as Msg} from './main'

interface Props{
 msg: Msg;
}

export const  Message = (props:Props) => {
  const {msg} = props;
    return (
    <div>
        <div>
            <h1>{msg.title}</h1>
        </div>

        <div>
            <p>{msg.description}</p>
        </div>

        <div>
            <p>{msg.username}</p>
        </div>
    </div>
  )
}

