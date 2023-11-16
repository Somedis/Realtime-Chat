import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import LogButton from './UI/Buttons/LogButton';
import { logout } from '../features/user';

const Header = () => {
    const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(state => state.user);

    const authLinks = (
        <>
            <h1>Chat API</h1>
            <LogButton onClick={() => dispatch(logout())}>
                <Link to={'/login'}>
                    Logout
                </Link>
            </LogButton>
        </>
    )

    const guestLinks = (
        <>
            <h1>Chat</h1>
        </>
    )

    return (
        <div className='app-header'>
            {isAuthenticated ? authLinks : guestLinks}
        </div>
    )
}

export default Header