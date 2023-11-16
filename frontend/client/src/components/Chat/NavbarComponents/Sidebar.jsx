import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ChatsList from './ChatsList'

const Sidebar = ({ userPk, userLogin, socket }) => {

  const [ data, setData ] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        // console.log(data)
        switch (data.action) {
          case 'get_users':
            // console.log(data.data)
            setData(() => {
              const dataArray = data.data
              const sortArray = Object.values(dataArray)
              sortArray.sort((a, b) => {
                const timeA = a.last_message.created_at_formatted;
                const timeB = b.last_message.created_at_formatted;
                return timeB.localeCompare(timeA);
              });
              return sortArray
            })
            break;
          case 'update_data':
            // console.log(data.data)
            setData((prevData) => {
              const newData = [...prevData]
              for (let key in newData) {
                if (newData[key].pk === data.data.pk) {
                  newData[key] = {
                    ...newData[key], last_message: data.data.last_message
                  };
                  break;
                }
              }

              const dataArray = Object.values(newData)
              dataArray.sort((a, b) => {
                const timeA = a.last_message.created_at_formatted;
                const timeB = b.last_message.created_at_formatted;
                return timeB.localeCompare(timeA);
              });
              return dataArray
            });

            break;
          default:
            break;
        }
      };
    }
  }, [socket])

  return (
    <div className='sidebar'>
        {data
          ? <div>
              <Navbar
                userLogin={userLogin}
              />
              <ChatsList
                data={data}
                userPk={userPk}
              />
            </div>
          : <div>
              <Navbar
                userLogin={userLogin}
              />
            </div>
        }
    </div>
  );
};

export default Sidebar;