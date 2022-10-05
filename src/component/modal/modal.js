import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

import styles from './modal.module.scss';

const Modal = ({ isHeader, title, closeModal, isModalOpen, ...props }) => {

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

ModalOverlay.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

Modal.propTypes = {
    isHeader: PropTypes.bool,
    isModalOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Modal;
