import React from 'react'
import eventBus from '../../../features/eventBus'

const ChatItem = ({ room, userPk, isActive, onMouseDown }) => {

  const setRoomPk = () => {
    localStorage.removeItem('roomName')
    localStorage.removeItem('roomPk')
    localStorage.setItem('roomName', JSON.stringify(room.name))
    localStorage.setItem('roomPk', JSON.stringify(room.pk))

    eventBus.emit('localStorageChangeName', JSON.stringify(room.name));
    eventBus.emit('localStorageChangePk', JSON.stringify(room.pk));

    onMouseDown()
  }

  return (
    <div>
      {isActive === room.pk
        ? <div className='notes-list-item-active'>
            <div >
              <p>{room.name}</p>
              <div>
                {room.last_message.user !== undefined
                  ? <div>
                      {room.last_message.user.id === userPk
                        ? <p>
                            you: {room.last_message.text}
                          </p>
                        : <p>
                            {room.last_message.user.login}: {room.last_message.text}
                          </p>
                      }
                    </div>
                  : <div>
                      <p>no messages here</p>
                    </div>
                }
              </div>
            </div>
          </div>
        : <div
            className='notes-list-item'
            onClick={setRoomPk}
          >
            <div >
              <p>{room.name}</p>
              <div>
                {room.last_message.user !== undefined
                  ? <div>
                      {room.last_message.user.id === userPk
                        ? <p>
                            you: {room.last_message.text}
                          </p>
                        : <p>
                            {room.last_message.user.login}: {room.last_message.text}
                          </p>
                      }
                    </div>
                  : <div>
                      <p>no messages here</p>
                    </div>
                }
              </div>
            </div>
          </div>
      }
    </div>

  )
}

export default ChatItem