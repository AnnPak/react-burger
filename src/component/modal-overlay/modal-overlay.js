import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeModal } from '../../store/slice'


import styles from './modal-overlay.module.scss';

const ModalOverlay = (props) => {

    const dispatch = useDispatch();

    return (
        <section 
            className={classnames(styles.modalOverlay, styles.modalShow)}
            onClick={() => dispatch(removeModal())}>
            {props.children}
        </section>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ModalOverlay