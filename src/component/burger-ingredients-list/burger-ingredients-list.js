import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsSection = ({ data, type, openModal, selectedId, setSelectedId }) => {

    const filtedIngredientsArray = data.filter(item => item.type === type);
    let title;

    switch(type){
        case 'bun':
            title = 'Булки';
            break;
        case 'sauce':
            title = 'Соусы';
            break;
        case 'main':
            title = 'Начинки';
            break;
        default: 
    } 

    return (
        <section>
            <h3 className={styles.ingredientsTitle} id={type + '-title'}>{title}</h3>

            <div className={styles.ingredientsList}>
                {filtedIngredientsArray.map(item => 
                    <BurgerIngredientsItem
                        openModal={openModal}
                        ingredient={item}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        key={item._id}/>)}
            </div>
        </section>

    )
}

const BurgerIngredientsItem = ({ ingredient, openModal, setSelectedId }) => {

    const {name, image, price, _id} = ingredient;

    return (
        <div className={classnames(styles.ingredientsItem, 'mt-6 ml-4 mb-10')} 
             onClick={() => {setSelectedId(_id); openModal(); }}>
            
            <img src={image} alt={name}/>
            
            <div className={classnames(styles.ingredientsItemPrice, 'mt-1 mr-4 mb-1')}>
                <p className='pr-2'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>

        </div>
    )
}

const BurgerIngredientsList = ({ data, openModal, selectedId, setSelectedId }) => {
    let typesArray = data.map(item => item.type);
    typesArray = [...new Set(typesArray)];

    return (
        <section className={classnames(styles.ingredientsSectionsList, 'mt-10')}>
            {
                typesArray.map(item => 
                    <BurgerIngredientsSection 
                        key={item}
                        data={data} 
                        type={item}
                        openModal={openModal}
                        selectedId={selectedId} 
                        setSelectedId={setSelectedId}/>
                )
            }
        </section>
    )
}

BurgerIngredientsList.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    openModal: PropTypes.func.isRequired,
    setSelectedId: PropTypes.func,
    selectedId: PropTypes.string
};

BurgerIngredientsSection.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    type: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    setSelectedId: PropTypes.func,
    selectedId: PropTypes.string
};

BurgerIngredientsItem.propTypes = {
    ingredient: dataPropTypes.isRequired,
    openModal: PropTypes.func,
    setSelectedId: PropTypes.func
};

export default BurgerIngredientsList;