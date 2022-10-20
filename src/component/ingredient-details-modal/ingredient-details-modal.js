import classnames from 'classnames';

import Modal from '../modal/modal';
import { useSelector } from 'react-redux';

import styles from './ingredient-details-modal.module.scss'


const IngredientDetails = () => {
    const { ingredientInModal } = useSelector(store => store);

    return (
        <>
            {
                ingredientInModal &&
                <>
                    <div className={styles.ingredientModalContent}>
                        <div className={styles.ingredientModalImg}>
                            <img src={ingredientInModal.image_large} alt={ingredientInModal.name} />
                        </div>
                        <div className={classnames(styles.ingredientModalTitle, 'text text_type_main-medium')}>
                            {ingredientInModal.name}
                        </div>
                    </div>

                    <div className={styles.ingredientComposition}>
                        <div className={styles.ingredientCompositionItem}>
                            <div className="text text_type_main-small">Калории,ккал</div>
                            <div className="text text_type_digits-medium">{ingredientInModal.calories}</div>
                        </div>
                        <div className={styles.ingredientCompositionItem}>
                            <div className="text text_type_main-small">Белки, г</div>
                            <div className="text text_type_digits-medium">{ingredientInModal.proteins}</div>
                        </div>
                        <div className={styles.ingredientCompositionItem}>
                            <div className="text text_type_main-small">Жиры, г</div>
                            <div className="text text_type_digits-medium">{ingredientInModal.fat}</div>
                        </div>
                        <div className={styles.ingredientCompositionItem}>
                            <div className="text text_type_main-small">Углеводы, г</div>
                            <div className="text text_type_digits-medium">{ingredientInModal.carbohydrates}</div>
                        </div>
                    </div>
                </>
            }

        </>

    )
}

const IngredientDetailsModal = () => {
    return (
        <Modal
            title={'Детали ингредиента'}
            isHeader={true}>

            <IngredientDetails />
        </Modal>
    )
}

export default IngredientDetailsModal