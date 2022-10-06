import classnames from 'classnames';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import dataPropTypes from '../../utils/constants';

import styles from './ingredient-details.module.scss'


const IngredientDetails = ({ data, selectedId }) => {
    const selectedIngredientData = data.find(item => item._id === selectedId);

    return (
        <>
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
        </>

    )
}

const IngredientDetailsModal = ({ isModalOpen, closeModal, data, selectedId, }) => {
    return (
        <Modal title={'Детали ингредиента'}
            isHeader={true}
            isModalOpen={isModalOpen}
            closeModal={closeModal}>

            <IngredientDetails data={data} selectedId={selectedId} />
        </Modal>
    )
}

IngredientDetailsModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
}

IngredientDetails.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    selectedId: PropTypes.string.isRequired,
}

export default IngredientDetailsModal