import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

import styles from './modal.module.scss';

export const Modal = ({ isHeader, title, closeModal, isModalOpen, ...props }) => {

    const modalRoot = document.getElementById("react-modals");

    return ReactDOM.createPortal(
        <ModalOverlay isModalOpen={isModalOpen}>
            <div className={classnames(styles.modal, 'p-10')}>

                <div className={styles.modalClose}>
                    <CloseIcon type="primary" onClick={closeModal}/>
                </div>


                {isHeader &&
                    <div className={styles.modalHeader}>
                        <p className="text text_type_main-default">{title}</p>
                    </div>
                }

                <div className={styles.modalBody}>
                    {props.children}
                </div>
            </div>
        </ModalOverlay>
        ,
        modalRoot
    )

}

const ModalOverlay = ({isModalOpen, ...props}) => {
    return (
        <section className={classnames(styles.modalOverlay, isModalOpen ? styles.modalShow : '')}>
            {props.children}
        </section>
    )
}

export default Modal;
