import { useEffect } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';

import styles from './modal.module.scss';

const Modal = ({ isHeader, title, closeModal, isModalOpen, ...props }) => {

    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeModal()
            }
        }
        window.addEventListener('keydown', close)

        return () => window.removeEventListener('keydown', close)
    }, [])

    return ReactDOM.createPortal(
        <ModalOverlay isModalOpen={isModalOpen} closeModal={closeModal}>
            <div className={classnames(styles.modal, 'p-10')} onClick={(e) => e.stopPropagation()}>

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

const ModalOverlay = ({isModalOpen, closeModal, ...props}) => {
    return (
        <section className={classnames(styles.modalOverlay, isModalOpen ? styles.modalShow : '')}
                  onClick={closeModal}>
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
