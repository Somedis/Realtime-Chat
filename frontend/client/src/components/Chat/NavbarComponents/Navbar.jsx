import React from 'react'
import BurgerMenu from '../../UI/BurgerMenu/BurgerMenu'
import Search from './Search'

const Navbar = ({ userLogin }) => {

    return (
        <div className='app-header'>
            <BurgerMenu
                userLogin={userLogin}
            />
            <Search />
        </div>
    )
}

export default Navbar