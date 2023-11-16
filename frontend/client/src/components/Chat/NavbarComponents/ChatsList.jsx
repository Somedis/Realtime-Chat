import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ChatItem from './ChatItem'
import { setActiveRoom } from '../../../features/user';

const ChatsList = ({ data, userPk }) => {
  const { activeRoom } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleRoomClick = (room) => {
    dispatch(setActiveRoom(room.pk));
  };

  return (
    <div>
      {data !== undefined
        ? <div className='notes-list'>
            {data.map((room, index) => (
              <ChatItem
                key={index}
                room={room}
                userPk={userPk}
                isActive={activeRoom}
                onMouseDown={() => handleRoomClick(room)}
              />
            ))}
          </div>
        : <div></div>
      }
    </div>
  )
}

export default ChatsList