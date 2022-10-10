import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import Preloader from '../preloader/preloader';

import styles from './order-details-modal.module.scss';
import doneImg from '../../images/done.png'

const OrderDetails = ({ orderData }) => {

    return (
        <>
            <div className={styles.constructorModalId}>
                <p className={classnames("text text_type_digits-large mt-8", styles.orderNumber)}>{orderData.order.number}</p>

                <p className="text text_type_main-medium mt-9">
                    идентификатор заказа
                </p>
            </div>


            <img src={doneImg} className={styles.constructorModalImg} alt="Заказ создан"/>

            <div className={classnames("mt-15 mp-10", styles.orgerInfo)}>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className={classnames("text text_type_main-default text_color_inactive", styles.orderNumber)}>Дождитесь готовности на орбитальной станции</p>
            </div>
           
        </>
    )
}

const OrderDetailsModal = ({isModalOpen, closeModal, orderData, orderStatus}) => {

    const SetContent = () => {
        switch (orderStatus) {
            case 'loading':
                return <Preloader />
            case 'done':
                return (
                    <OrderDetails orderData={orderData}/>
                )
            case 'error':
                return (
                    <p className="text text_type_main-medium">
                    <InfoIcon type="error" />
                        Ошибка!
                    </p>
                )
            default:
                break;
        }
    }

    return(
        <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
            <SetContent/>
        </Modal>
    )
}

OrderDetails.propTypes = {
    orderData: PropTypes.object.isRequired
}

OrderDetailsModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    orderData: PropTypes.object.isRequired,
    orderStatus: PropTypes.string.isRequired
}

export default OrderDetailsModal