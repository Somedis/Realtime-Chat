import React, { useState } from 'react'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';

import ModalWin from '../../UI/ModalWin/ModalWin';
import classes from '../../UI/ModalWin/ModalWin.module.css'

const ChatNavbar = ({ socket, roomPk, reqId, userPk, room }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className='chat-navbar'>
      {room !== undefined
        ? <div className='chat-group-label'>
            <p className='chat-group-name'>{room.room.name}</p>
            <p className='chat-group-members'>
              {room.room.current_users.length} members
            </p>
          </div>
        : <div></div>
      }
      <div className='chat-threedots'>
        <PiDotsThreeOutlineVerticalFill onClick={handleOpen}/>
        <ModalWin
          visible={open}
          setVisible={setOpen}
          classesProp={classes.ModalContent}
        >
          <p className='chat-group-name'>Group Name</p>
          <p className='chat-group-members'>List of members</p>
        </ModalWin>
      </div>
    </div>
  )
}

export default ChatNavbar