import { useState } from 'react'
import { useSelector } from 'react-redux';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'
import IngredientDetailsModal from '../ingredient-details-modal/ingredient-details-modal';

import styles from './burger-ingredients.module.scss'


const BurgerIngredients = () => {

    const ingregients = useSelector(store => store.ingregients)

    const [current, setCurrent] = useState('bun');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('null');

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (

        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent} />

            <BurgerIngredientsList 
                data={ingregients}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                setSelectedId={setSelectedId}
                selectedId={selectedId} />

            {isModalOpen && ingregients > 0 &&
                <IngredientDetailsModal 
                    data={ingregients}
                    selectedId={selectedId}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal} />
            }


        </section>
    )
}


export default BurgerIngredients;