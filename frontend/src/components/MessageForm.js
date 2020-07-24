import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'

const MessageForm = ({ username }) => {
  const [message, setMessage] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE)
  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({ variables: { username, body: message } })
    setMessage('');
  };

  return (
    <div className='form-container'>
      <form>
        <input
          type='text'
          name='message'
          id='message'
          value={message}
          placeholder='Enter message'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;

const ADD_MESSAGE = gql`
  mutation addMessage($username:String,$body:String){
    addMessage(username:$username,body:$body){
      id
    }
  }
`