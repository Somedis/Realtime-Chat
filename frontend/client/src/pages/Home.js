import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/UI/Loader/Loader'

import LogButton from '../components/UI/Buttons/LogButton';
import Header from '../components/Header';


const Home = () => {
    const router = useNavigate()
    const { isAuthenticated, user, loading } = useSelector(state => state.user);

    const [roomData, setRoomData] = useState({
        name: '',
        user_id: ''
    })

    const { name } = roomData

    const handleChange = (e) => {
        setRoomData({
            ...roomData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (req, res) => {
        req.preventDefault();

        fetch(`/api/chat/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...roomData, user_id: user.pk}),
        })

        console.log(roomData.name)
        router(`/room/${roomData.name}`)
    }

    const onSubmitGetRoom = async (e) => {
        e.preventDefault();

        router(`/room/${roomData.name}`)
    }

    return (
        <div className='notes'>
            {loading
            ? <Loader/>
            : <div>
                {!isAuthenticated && user === null
                ? <Navigate to='login' />
                : <div className='notes-header'>
                    <h2 className='notes-title'>&#9782; Chat</h2>
                    {loading || user === null ? (
                        <p className='notes-title'></p>
                    ) : (
                        <p className='notes-title'>{user.login}</p>
                    )}
                  </div>
                }
                    <Header/>
                    <div>
                        <p className='choose-p'>
                            Create and enter into the room
                        </p>
                        <form method="POST" onSubmit={onSubmit}>
                            <div className='room-form'>
                                <input
                                    className='txt-input'
                                    name="name"
                                    value={name}
                                    type="text"
                                    onChange={handleChange}/>
                                <div className='choose-btn'>
                                    <LogButton>Enter</LogButton>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p className='choose-p'>
                            Enter into the room
                        </p>
                        <form method="POST" onSubmit={onSubmitGetRoom}>
                            <div className='room-form'>
                                <input
                                    className='txt-input'
                                    name="name"
                                    value={name}
                                    type="text"
                                    onChange={handleChange}/>
                                <div className='choose-btn'>
                                    <LogButton>Enter</LogButton>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
            }
        </div>
    )
}

export default Home