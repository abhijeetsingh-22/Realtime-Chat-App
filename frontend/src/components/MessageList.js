import React, { useEffect } from 'react';
import { useQuery, gql } from "@apollo/client"

const MessageList = ({ username }) => {
  const { data, loading, subscribeToMore } = useQuery(GET_MESSAGES)

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUB, updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev
        const newMessage = subscriptionData.data.newMessage
        const updatedMessageList = Object.assign({}, prev, { messages: [...prev.messages, newMessage] })
        return updatedMessageList
      }
    })
  }, [])


  if (!loading) {
    var messageMap = data.messages.map(message => {
      const MessageType = message.username === username ? 'message-outgoing' : 'message-incomming'
      return (<div className={`message ${MessageType}`}>
        {MessageType === 'message-incomming' ? <p className='name'>{message.username}</p>
          : null}
        <p>{message.body}</p>
      </div>)

    })
  }

  return !loading && <div className='message-list'>{messageMap}</div>;
};

export default MessageList;

const GET_MESSAGES = gql`
  query{
    messages{
      id
      username
      body
    }
  }
`
const MESSAGE_SUB = gql`
  subscription {
    newMessage{
      id
      username
      body
    }
  }
`
