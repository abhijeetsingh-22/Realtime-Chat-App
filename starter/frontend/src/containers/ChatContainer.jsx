import React, { useState, useRef } from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Header from '../components/Header';
const ChatContainer = () => {
  const [username, setUsername] = useState('');
  const usernameRef = useRef(null);
  return (
    <div className='container'>
      {!!username ? (
        <div className='chat-container'>
          <Header />
          <MessageList username={username} />
          <MessageForm username={username} />
        </div>
      ) : (
          <div className='login'>
            <h2>Enter Username</h2>
            <form className='login-form'>
              <input type='text' name='username' id='username' ref={usernameRef} />
              <button
                type='submit'
                onClick={(e) => {
                  e.preventDefault();
                  setUsername(usernameRef.current.value);
                }}
              >
                Login
            </button>
            </form>
          </div>
        )}
    </div>
  );
};

export default ChatContainer;
