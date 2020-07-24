import React, { useState } from 'react';

const MessageForm = ({ username }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
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
