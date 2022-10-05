import PropTypes from 'prop-types';
import classnames from 'classnames';

import Modal from '../modal/modal';

import styles from './ingredient-details.module.scss';
import doneImg from '../../images/done.png'

const IngredientDetails = ({ isModalOpen, closeModal, orderData }) => {

    return (
        <>
            <Modal isModalOpen={isModalOpen} closeModal={closeModal}>

                <div className={styles.constructorModalId}>
                    <p className={classnames("text text_type_digits-large mt-8", styles.orderNumber)}>{orderData.orderNumber}</p>

                    <p className="text text_type_main-medium mt-9">
                        идентификатор заказа
                    </p>
                </div>


                <img src={doneImg} className={styles.constructorModalImg}/>

                <div className={classnames("mt-15 mp-10", styles.orgerInfo)}>
                    <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                    <p className={classnames("text text_type_main-default text_color_inactive", styles.orderNumber)}>Дождитесь готовности на орбитальной станции</p>
                </div>

            </Modal>
        </>
    )
}

IngredientDetails.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func,
    orderData: PropTypes.object.isRequired
}

export default IngredientDetails