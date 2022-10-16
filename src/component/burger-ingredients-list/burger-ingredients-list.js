import React, {useMemo} from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredientToModal } from '../../services/actions/index'

import classnames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { dataPropTypes } from '../../utils/constants';

import styles from './burger-ingredients-list.module.scss'

const BurgerIngredientsSection = ({ ingregients, type }) => {
    
    //массив ингредиентов нужного типа
    const filtedIngredientsArray = useMemo(() => ingregients.filter(item => item.type === type), [ingregients]); 
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
                {filtedIngredientsArray.map(ingredient => 
                    <BurgerIngredientsItem
                        ingredient={ingredient}
                        key={ingredient._id}/>)}
            </div>
        </section>

    )
}

const BurgerIngredientsItem = ({ ingredient }) => {

    const {name, image, price} = ingredient;
    const dispatch = useDispatch()

    return (
        <div className={classnames(styles.ingredientsItem, 'mt-6 ml-4 mb-10')} 
             onClick={() => {dispatch(addIngredientToModal(ingredient))}}>
            
            <img src={image} alt={name}/>
            
            <div className={classnames(styles.ingredientsItemPrice, 'mt-1 mr-4 mb-1')}>
                <p className='pr-2'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p>{name}</p>

        </div>
    )
}

const BurgerIngredientsList = () => {
    const {ingregients } = useSelector(store => store);

    let typesArray = ingregients.map(item => item.type); //создаю массив из типов ингредиентов
    typesArray = [...new Set(typesArray)]; //убираю повторяющиеся элементы

    return (
        <section className={classnames(styles.ingredientsSectionsList, 'mt-10')}>
            {
                //вывожу секции ингредиентов по типам 
                typesArray.map(ingredientType => 
                    <BurgerIngredientsSection 
                        ingregients = {ingregients}
                        key={ingredientType}
                        type={ingredientType} />
                )
            }
        </section>
    )
}

BurgerIngredientsSection.propTypes = {
    type: PropTypes.string,
    ingredients: PropTypes.arrayOf(dataPropTypes).isRequired,
};

BurgerIngredientsItem.propTypes = {
    ingredient: dataPropTypes.isRequired,
};

export default BurgerIngredientsList;