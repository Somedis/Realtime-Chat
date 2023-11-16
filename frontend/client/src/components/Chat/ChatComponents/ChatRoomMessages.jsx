import React, { useState, useEffect, useRef } from 'react'
import MessageComponent from './MessageComponent'

const ChatRoomMessages = ({ dataMessages, inputMessages, userPk }) => {
    const [ attempt, setAttempt ] = useState(0);
    const messagesEndRef = useRef(null);
    const [ isAutoScroll, setIsAutoScroll ] = useState(false);

    const scrollToBottomInst = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
    }

    const scrollToBottomSmooth = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const scrollHandler = () => {
        if (inputMessages[attempt]) {
          // console.log(inputMessages[attempt])
          if (inputMessages[attempt].user.pk === userPk) {
            scrollToBottomSmooth()
          }
          setAttempt((e) => {return e + 1})
        }
    }

    const messagesScrollHandler = (e) => {
        const el = e.currentTarget
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
    }, [inputMessages]);

    useEffect(() => {
        scrollToBottomInst()
    }, [dataMessages]);

    return (
        <div
            className='chat-messages-container'
            onScroll={messagesScrollHandler}
        >
            <MessageComponent element={dataMessages} userPk={userPk} />
            <MessageComponent element={inputMessages} userPk={userPk} />
              <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatRoomMessages