import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.scss';

export const Modal = props => {

    console.log(props)
    const modalRoot = document.getElementById("react-modals");

    return ReactDOM.createPortal(
        <section className={styles.modal}>
            <div className={styles.modalHeader}>
                <p className="text text_type_main-default">{props.title}</p>

                <div className={styles.modalClose}>
                    <CloseIcon type="primary" />
                </div>
            </div>

            <div className={styles.modalBody}>
                {props.children}
            </div>
        </section>,
        modalRoot
    )

}
