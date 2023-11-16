import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'

import ChatNavbar from './ChatNavbar';
import ChatRoomMessages from './ChatRoomMessages';
import { BiSolidChevronRightCircle } from 'react-icons/bi';

const ChatRoom = ({ socket, roomPk, reqId, userPk }) => {

  const [ chatRoomHeight, setChatRoomHeight ] = useState(704);
  const [ privMessages, setPrivMessages ] = useState([]);
  const [ messages, setMessages ] = useState([]);
  const [ messageInput, setMessageInput ] = useState('');
  const textInputRef = useRef(null);
  const requestAnimationFrameRef = useRef(null);

  useEffect(() => {
    const textInput = textInputRef.current;

    if (textInput) {
      textInput.addEventListener('textarea', handleTextInputChange);
    }

    return () => {
      if (textInput) {
        textInput.removeEventListener('textarea', handleTextInputChange);
      }
    };
  }, [textInputRef]);

  const handleTextInputChange = () => {
    if (textInputRef.current) {
      const newHeight = textInputRef.current.scrollHeight;
      if (newHeight < 163) {
        setChatRoomHeight(745 - newHeight);
      }
    }
  };

  const autoChangeHeight = () => {
    textInputRef.current.style.height = "45px";
    textInputRef.current.style.height = `${textInputRef.current.scrollHeight}px`;

    cancelAnimationFrame(requestAnimationFrameRef.current);
    requestAnimationFrameRef.current = requestAnimationFrame(() => {
      handleTextInputChange();
    });
  }

  useLayoutEffect(autoChangeHeight, [messageInput]);

  const handleInputChange = (e) => {
    autoChangeHeight();
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log('Socket opened')
      socket.send(
        JSON.stringify({
          pk: roomPk,
          action: "join_room",
          request_id: reqId,
        })
      );
      socket.send(
        JSON.stringify({
          pk: roomPk,
          action: "retrieve",
          request_id: reqId,
        })
      );
      socket.send(
        JSON.stringify({
          pk: roomPk,
          action: "subscribe_to_messages_in_room",
          request_id: reqId,
        })
      );
      socket.send(
        JSON.stringify({
          pk: roomPk,
          action: "subscribe_instance",
          request_id: reqId,
        })
      );
      socket.send(
        JSON.stringify({
          pk: roomPk,
          action: "get_messages",
          request_id: reqId,
        })
      );
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // console.log(data)
      switch (data.action) {
        case "get_messages":
          setPrivMessages(data.data["0"].messages)
          break;
        case "create":
          setMessages((oldMessages) => {
            if (Array.isArray(oldMessages)) {
              return [...oldMessages, data.data];
            } else {
              return [data.data];
            }
          });
          break;
        default:
          break;
      }
    };

    socket.onclose = (e) => {
      console.error('Room socket closed unexpectedly');
    };

    return () => {
      socket.close();
      setMessages([])
    };
  }, [socket, userPk])


  const handleSendMessage = () => {
    if (messageInput && messageInput.trim().length !== 0) {
      socket.send(
        JSON.stringify({
          message: messageInput,
          action: "create_message",
          request_id: reqId,
        })
        );
      setMessageInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
      e.preventDefault();
      handleSendMessage();
    } else if (e.key === 'Enter' && e.ctrlKey) {
      setMessageInput(messageInput + '\n');
    };
  };

  return (
    <div>
      <ChatNavbar
        socket={socket}
        roomPk={roomPk}
        reqId={reqId}
        userPk={userPk}
        room={privMessages[0]}
      />
      <div
        className='chat-room'
        style={{ height: `${chatRoomHeight}px` }}
      >
        <ChatRoomMessages
          dataMessages={privMessages}
          inputMessages={messages}
          userPk={userPk}
        />
      </div>
      <div className='chat-input-container'>
        <div className='chat-input-wrapper'>
          <div className='hide-area'></div>
          <textarea
            className='message-area'
            ref={textInputRef}
            value={messageInput}
            onChange={handleInputChange}
            placeholder='Type something...'
            onKeyDown={handleKeyDown}
          >
          </textarea>
        </div>
        <div
          className='send-btn'
          onClick={handleSendMessage}
        >
          <BiSolidChevronRightCircle/>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom