import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ChatComponent from '../components/Chat/ChatComponent'

const ChatRoom = () => {
    const params = useParams();
    const { user } = useSelector(state => state.user);
    const [room, setRoom] = useState(null);
    const requestId = new Date().getTime();
    const [chatSocket, setChatSocket] = useState();

    const fetchRoom = async () => {
        const response = await fetch (`/api/chat/room/${params.slug}`)
        const data = await response.json()
        setRoom(data)

        const dataToken = JSON.parse(localStorage.getItem('token'))
        const createChatSocket = new WebSocket(
            `ws://127.0.0.1:8000/ws/chat/room/${params.slug}/?token=${dataToken}`
            );
        setChatSocket(createChatSocket)
    };

    useEffect(() => {
        fetchRoom()
    }, []);

    return (
        <div>
            <p>Room name - {room?.name}</p>
            <p>Room pk - {room?.pk}</p>
            <div>
                {room
                    ?<ChatComponent
                        roomPk={room?.pk}
                        reqId={requestId}
                        socket={chatSocket}
                        userPk={user?.pk}
                        />
                    :<div></div>
                }
            </div>
        </div>
    )
}

export default ChatRoom