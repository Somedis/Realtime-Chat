import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Loader from '../components/UI/Loader/Loader'
import ChatMain from '../components/Chat/ChatMain';

const HomeNew = () => {
  const { isAuthenticated, user, loading } = useSelector(state => state.user);

  return (
        <div>
          {loading
            ? <Loader/>
            : <div>
                {!isAuthenticated && user === null
                ? <Navigate to='login' />
                : <div className='container dark'>
                  {loading || user === null
                    ? <div></div>
                    : <div>
                        <ChatMain
                          userPk={user?.pk}
                          userLogin={user?.login}
                        />
                      </div>
                  }
                  </div>
                }
              </div>
            }
        </div>
  )
}

export default HomeNew