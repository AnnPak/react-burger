import React, { useMemo } from 'react'
import PropTypes from 'prop-types';
import BurgerIngredientsItem from './burger-ingredients-item';

import styles from './burger-ingredients-list.module.scss';
import { dataPropTypes } from '../../utils/constants';

const BurgerIngredientsSection = ({ ingredients, type }) => {
    //массив ингредиентов нужного типа
   const filtedIngredientsArray = useMemo(() => ingredients.filter(item => item.type === type), [ingredients, type]);
   let title;

   switch (type) {
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
       <>
           <h3 className={styles.ingredientsTitle} id={type + '-title'}>{title}</h3>

           <div className={styles.ingredientsList}>
               {filtedIngredientsArray.map(ingredient =>
                   <BurgerIngredientsItem
                       ingredient={ingredient}
                       key={ingredient._id} />)}
           </div>

       </>

   )
}

BurgerIngredientsSection.propTypes = {
    type: PropTypes.string,
    ingredients: PropTypes.arrayOf(dataPropTypes),
};


export default BurgerIngredientsSection;