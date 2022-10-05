import classnames from 'classnames';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import dataPropTypes from '../../utils/constants';

import styles from './order-details.module.scss'


const OrderDetails = (props) => {

    const { data, selectedId, isModalOpen, openModal, closeModal } = props;
    const selectedIngredientData = data.find(item => item._id === selectedId);

    return (
        <>

            <Modal title={'Детали ингредиента'}
                isHeader={true}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}>

                <div className={styles.ingredientModalContent}>
                    <div className={styles.ingredientModalImg}>
                        <img src={selectedIngredientData.image_large} />
                    </div>
                    <div className={classnames(styles.ingredientModalTitle, 'text text_type_main-medium')}>
                        {selectedIngredientData.name}
                    </div>
                </div>

                <div className={styles.ingredientComposition}>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Калории,ккал</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.calories}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Белки, г</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.proteins}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Жиры, г</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.fat}</div>
                    </div>
                    <div className={styles.ingredientCompositionItem}>
                        <div className="text text_type_main-small">Углеводы, г</div>
                        <div className="text text_type_digits-medium">{selectedIngredientData.carbohydrates}</div>
                    </div>
                </div>
            </Modal>

        </>

    )
}

OrderDetails.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    selectedId: PropTypes.string.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default OrderDetails