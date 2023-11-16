import React, {useState, useEffect} from 'react'

import Sidebar from './NavbarComponents/Sidebar'
import Chat from './ChatComponents/Chat'

const ChatMain = ({ userPk, userLogin }) => {

    const requestId = new Date().getTime();
    const [ socket, setSocket ] = useState(null);

    useEffect(() => {

      const createWebSocket = () => {
        const dataToken = JSON.parse(localStorage.getItem('token'));
        if (dataToken !== null) {
          const newSocket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/?token=${dataToken}`
          );
          newSocket.onopen = () => {
            console.log('User socket opened');
            newSocket.send(
              JSON.stringify({
                action: 'get_users',
                request_id: requestId,
                pk: userPk,
              })
            );
          };

          newSocket.onclose = (e) => {
            console.error('User socket closed unexpectedly');
          };

          setSocket(newSocket)
        }
      };

      if (socket === null) {
        createWebSocket();
      }

      return () => {
        if (socket) {
          socket.close();
        }
      };
    }, [socket, userPk])

  return (
      <div className='home'>
        <Sidebar
          userPk={userPk}
          userLogin={userLogin}
          socket={socket}
        />
        <Chat userPk={userPk}/>
      </div>
  )
}

export default ChatMain