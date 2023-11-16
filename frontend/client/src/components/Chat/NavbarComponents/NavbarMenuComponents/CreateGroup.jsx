import React, { useState } from 'react'

import ModalWin from '../../../UI/ModalWin/ModalWin'
import classes from '../NavbarMenuComponents/CreateGroup.module.css'

const CreateGroup = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <h4
        onClick={handleOpen}
        className={classes.CreateGroup}
      >
        Create group
      </h4>
      <ModalWin
        visible={open}
        setVisible={setOpen}
        classesProp={classes.ModalContent}
      >
        <p>Create group</p>
        <p>Group name</p>
        <input type="text" />
      </ModalWin>
    </div>
  )
}

export default CreateGroup