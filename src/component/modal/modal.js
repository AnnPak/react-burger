import { useEffect } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.scss';

const Modal = ({ isHeader, title, closeModal, isModalOpen, ...props }) => {

    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const closeModalByEsc = (evt) => {
            if (evt.key === 'Escape') {
                closeModal()
            }
        }

        window.addEventListener('keydown', closeModalByEsc)

        return () => window.removeEventListener('keydown', closeModalByEsc)
    }, [])

    return ReactDOM.createPortal(
        <ModalOverlay isModalOpen={isModalOpen} closeModal={closeModal}>
            <div className={classnames(styles.modal, 'p-10', isModalOpen ? styles.modalShow : '')} onClick={(e) => e.stopPropagation()}>

                <div className={styles.modalClose}>
                    <CloseIcon type="primary" onClick={closeModal} />
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


Modal.propTypes = {
    isHeader: PropTypes.bool,
    isModalOpen: PropTypes.bool.isRequired,
    title: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Modal;
