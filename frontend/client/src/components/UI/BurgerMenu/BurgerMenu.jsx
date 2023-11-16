import React from 'react'
import classes from './BurgerMenu.module.css'
import { slide as Menu } from 'react-burger-menu'
import CreateGroup from '../../Chat/NavbarComponents/NavbarMenuComponents/CreateGroup'
import Logout from '../../Chat/Logout'

const BurgerMenu = ({ userLogin }) => {
  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      marginLeft: '20px',
      marginTop: '30px',
    },
    bmBurgerBars: {
      background: '#f68657'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7',
    },
    bmMenuWrap: {
      position: 'absolute',
      height: '850px',
    },
    bmMenu: {
      background: '#292a2c',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
      width: '299px'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
      display: 'flex',
      justifyContent: 'center'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      height: '850px',
      width: '1200px',
      position: 'absolute'
    }
  }

  return (
    <div className={classes.BurgerMenu}>
      <Menu styles={styles} >
        <div className={classes.InnerMenu}>
          <div>
            <div className={classes.UserInfo}>
              <h4>{userLogin}</h4>
            </div>
            <div className={classes.MenuAction}>
              <h4>Start dialogue</h4>
            </div>
            <div className={classes.MenuAction}>
              <CreateGroup/>
            </div>
          </div>
          <div className={classes.LogoutAction}>
            <Logout/>
          </div>
        </div>
      </Menu>
    </div>
  )
}

export default BurgerMenu