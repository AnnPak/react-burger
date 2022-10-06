import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.scss';

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

export default ModalOverlay