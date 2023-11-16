import React, { useState, useEffect, useRef } from 'react'
import eventBus from '../../../features/eventBus'

import ChatRoom from './ChatRoom'

const Chat = ({ userPk }) => {
  const requestId = new Date().getTime();
  const [chatSocket, setChatSocket] = useState(null);
  const [roomPk, setRoomPk] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const previousRoomName = useRef(null);
  const chatSocketRef = useRef(null);


  useEffect(() => {
    const handleLocalStorageChangeName = (newValue) => {
      setRoomName(JSON.parse(newValue));
      previousRoomName.current = roomName;
    };
    eventBus.on('localStorageChangeName', handleLocalStorageChangeName);

    const handleLocalStorageChangePk = (newValue) => {
      setRoomPk(JSON.parse(newValue));
    };
    eventBus.on('localStorageChangePk', handleLocalStorageChangePk);

    return () => {
      eventBus.off('localStorageChangeName', handleLocalStorageChangeName);
      eventBus.off('localStorageChangePk', handleLocalStorageChangePk);
    };
  }, [])

  useEffect(() => {
    if (roomName !== null && roomName !== previousRoomName.current) {
      if (chatSocketRef.current) {
        chatSocketRef.current.close();
      }

      const dataToken = JSON.parse(localStorage.getItem('token'));
      const createChatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/room/${roomName}/?token=${dataToken}`
      );
      chatSocketRef.current = createChatSocket;
      setChatSocket(createChatSocket);
    }

    return () => {
      if (chatSocketRef.current) {
        chatSocketRef.current.close();
      }
    };
  }, [roomName]);

  return (
    <div>
      {roomName === null
        ? <div className='chat-flex'>
            <div className='preview'>
              <p>Choose who, you would like to write to</p>
            </div>
          </div>
        : <div className='chat'>
            {chatSocket !== null
              ? <div>
                  <ChatRoom
                    socket={chatSocket}
                    roomPk={roomPk}
                    reqId={requestId}
                    userPk={userPk}
                  />
                </div>
              : <div></div>
            }
          </div>
      }
    </div>
  )
}

export default Chat