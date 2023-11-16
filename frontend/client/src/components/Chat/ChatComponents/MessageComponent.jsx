import React from 'react'
import classes from './ChatComponent.module.css'

const MessageComponent = ({ element, userPk }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedDate;
  };

  return (
            <div>
                {element.map((message, index) => (
                  <div key={index}>
                    {userPk === (message.user.pk || message.user.id)
                      ? <div key={index} className={classes.messageAreaReverse}>
                          <div key={index} className={classes.messageDivRoot}>
                            <p className={classes.messageText}>
                              {message.text}
                            </p>
                            <p className={classes.rootTime}>
                              {formatDate(message.created_at_formatted)}
                            </p>
                          </div>
                        </div>
                      : <div key={index} className={classes.messageArea}>
                          <div key={index} className={classes.messageDivOthers}>
                            <div>
                              <h2 className={classes.userTextOther}>
                                {message.user.login}
                              </h2>
                              <p className={classes.messageText}>
                                {message.text}
                              </p>
                            </div>
                            <p className={classes.rootTime}>
                              {formatDate(message.created_at_formatted)}
                            </p>
                          </div>
                        </div>
                    }
                  </div>
                ))}
            </div>
  )
}

export default MessageComponent