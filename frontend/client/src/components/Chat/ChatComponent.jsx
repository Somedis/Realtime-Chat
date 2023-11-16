import React, { useState, useEffect, useRef } from 'react'
import classes from '../Chat/ChatComponents/ChatComponent.module.css'
import MessageComponent from '../Chat/ChatComponents/MessageComponent'

const ChatComponent = ({ roomPk, reqId, socket, userPk }) => {
    const [room, setRoom] = useState();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [ privMessages, setPrivMessages ] = useState([]);
    const [ attempt, setAttempt ] = useState(0)
    const messagesEndRef = useRef(null)
    const [ isAutoScroll, setIsAutoScroll ] = useState(false)

    const scrollToBottomInst = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
    }

    const scrollToBottomSmooth = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const scrollHandler = () => {
      if (messages[attempt]) {
        console.log(messages[attempt])
        if (messages[attempt].user.pk === userPk) {
          scrollToBottomSmooth()
        }
        setAttempt((e) => {return e + 1})
      }
    }

    const messagesScrollHandler = (e) => {
      const el = e.currentTarget
      // console.log(Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight))
      if (Math.abs((el.scrollHeight - el.scrollTop) - el.clientHeight) < 400) {
        !isAutoScroll && setIsAutoScroll(true)
      } else {
        isAutoScroll && setIsAutoScroll(false)
      }
    }

    useEffect(() => {
      scrollHandler()

      if (isAutoScroll) {
        scrollToBottomSmooth()
      }
      }, [messages]);

    useEffect(() => {
      scrollToBottomInst()
    }, [privMessages]);

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
          switch (data.action) {
            case "retrieve":
              setRoom(data.data);
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
            case "get_messages":
              setPrivMessages(data.data["0"].messages)
              // console.log(data.data["0"].messages)
              break;
            default:
              break;
          }
        };

        socket.onclose = (e) => {
          console.error('Chat socket closed unexpectedly');
        };

        return () => {
          socket.close();
        };

      }, [roomPk, reqId, socket, userPk]);

      const closeSocket = () => {
        socket.close();
      };

      const handleInputChange = (e) => {
        setMessageInput(e.target.value);
      };

      const handleSendMessage = () => {
        socket.send(
          JSON.stringify({
            message: messageInput,
            action: "create_message",
            request_id: reqId,
          })
          );
        setMessageInput('');
      };

    const listMessages = () => {
      console.log(messages)
      }


    return (
        <div>
          <div className={classes.messageContainer}
            id='chat-view'
            onScroll={messagesScrollHandler}
            >
            <MessageComponent element={privMessages} userPk={userPk} />
            <MessageComponent element={messages} userPk={userPk} />
              <div ref={messagesEndRef} />
          </div>
            <input
                id="chat-message-input"
                type="text"
                size="10"
                value={messageInput}
                onChange={handleInputChange}
                className={classes.inputArea}
            />
            <input
                id="chat-message-submit"
                type="button"
                value="Send"
                className={classes.inputBtn}
                onClick={handleSendMessage}
            />
            <input
                id="chat-message-submit"
                type="button"
                value="GET"
                className={classes.inputBtn}
                onClick={listMessages}
            />
        </div>
    )
}

export default ChatComponent