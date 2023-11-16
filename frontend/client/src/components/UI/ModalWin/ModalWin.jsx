import React from 'react'
import classes from './ModalWin.module.css'

const ModalWin = ({children, visible, setVisible, classesProp}) => {
    const rootClasses = [classes.Modal]

    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div
                className={classesProp}
                onClick={(e) => e.stopPropagation()}
                >
                {children}
            </div>
        </div>
    )
}

export default ModalWin