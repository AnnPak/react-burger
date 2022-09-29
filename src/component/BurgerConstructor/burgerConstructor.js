import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import './burgerConstructor.scss';



const BurgerConstructorWpaper = ({data}) => {
    const dataLength = data.length - 1;

    return(
        <div className="constructor-elements ml-4">
            {
                data.map((item, index) => {
                    let constructorElementType = index === 0 ? 'top' : (index === dataLength ? 'bottom' : '')
                    
                    return (
                        <ConstructorElement
                                    type={constructorElementType}
                                    isLocked={item.type === 'bun' ? true : false}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}/>
                                
                    )
                })
            }
        </div>
    )
}

const BurgerConstructorResult = () => {
    return(
        <section className='constructor-result mt-10'>
            <div className='constructor-result__price mr-10'>
                <p className="text text_type_main-large mr-2">610</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button type="primary" size="large">
                Оформить заказ
            </Button>
        </section>
       
    )
}

const BurgerConstructor = ({ data }) => {
    return(
        <section className='burgerSection-item mt-25 burgerSection-constructor'>
            <BurgerConstructorWpaper data={data}/>
            <BurgerConstructorResult/>
        </section>
    )
}
 
export default BurgerConstructor;