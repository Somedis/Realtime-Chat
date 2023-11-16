import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import LogButton from '../UI/Buttons/LogButton';
import { logout } from '../../features/user';

const Logout = () => {
    const dispatch = useDispatch();

    const logoutAndClear = () => {
        localStorage.removeItem('roomName')
        localStorage.removeItem('roomPk')
        localStorage.removeItem('token')
        dispatch(logout())
    }

    return (
        <div>
            <LogButton onClick={logoutAndClear}>
                <Link to={'/login'}>
                    Logout
                </Link>
            </LogButton>
        </div>
    )
}

export default Logout