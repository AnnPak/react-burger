import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import TabsWrapper from '../tabs-wrapper/tabs-wrapper'
import dataPropTypes from '../../utils/constants';
import OrderDetails from '../order-details/order-details';

import styles from './burger-ingredients.module.scss'


const BurgerIngredients = ({ data }) => {

    const [current, setCurrent] = useState('bun');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('null');

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeModal()
            }
        }
        window.addEventListener('keydown', close)

        return () => window.removeEventListener('keydown', close)
    }, [])

    return (

        <section className={styles.burgerIngredientsSection}>
            <h1 className="mt-10">Соберите бургер</h1>

            <TabsWrapper current={current} setCurrent={setCurrent} />

            <BurgerIngredientsList data={data}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                setSelectedId={setSelectedId}
                selectedId={selectedId} />

            {isModalOpen &&
                <OrderDetails data={data}
                    selectedId={selectedId}
                    isModalOpen={isModalOpen}
                    openModal={openModal}
                    closeModal={closeModal} />
            }


        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes)
};

export default BurgerIngredients;