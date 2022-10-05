import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';
import IngredientDetails from '../ingredient-details/ingredient-details';

import styles from './burger-constructor.module.scss';


const BurgerConstructorElement = (props) => {

    let {svg, type, isLocked, text, price, thumbnail, classname} = props;

    switch (type) {
        case 'top':
            text = text+' (верх)';
            break;
        case 'bottom':
            text = text+' (низ)';
            break;
        default:
    }

    return (
        <section className={classname}>
            {svg && <DragIcon className={styles.dragIcon}/>}
            <div className={classnames(styles.constructorElementWpapper, 'pl-2')}>
                <ConstructorElement
                    type={type}
                    isLocked={isLocked}
                    text={text}
                    price={price}
                    thumbnail={thumbnail} />

            </div>
           
        </section>
    )
}

const BurgerConstructorWpaper = ({ data }) => {
    const unlockedData = data.slice(1, -1);

    return (

        <section className={styles.constructorElements}>

            {
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={data[0]._id}
                    type='top'
                    isLocked={true}
                    text={data[0].name}
                    price={data[0].price}
                    thumbnail={data[0].image} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')}>
                {
                    
                    unlockedData.map((item) => {
                        return (
                            <BurgerConstructorElement
                                classname={classnames(styles.constructorElement)}
                                key={item._id}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                svg={true} />
                        )
                    })
                }
            </div>

            {
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={data[0]._id + 'n2'}
                    type='bottom'
                    isLocked={true}
                    text={data[0].name}
                    price={data[0].price}
                    thumbnail={data[0].image} />

            }

        </section>

    )
}

const BurgerConstructorResult = ({createOrder}) => {
    return (
        <section className={classnames(styles.constructorResult, 'mt-10')}>
            <div className={classnames(styles.constructorResultPrice, 'mr-10')}>
                <p className="text text_type_main-large mr-2">610</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button type="primary" 
                    size="large" 
                    htmlType='button'
                    onClick={createOrder}>
                Оформить заказ
            </Button>
        </section>

    )
}



const BurgerConstructor = ({data}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState({})

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const createOrder = () => {
        setOrderData({
            orderNumber: '034536'
        })

        openModal()
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
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper data={data}/>
            <BurgerConstructorResult openModal={openModal} createOrder={createOrder}/>

            {isModalOpen &&
                <IngredientDetails isModalOpen={isModalOpen}
                closeModal={closeModal}
                orderData={orderData} />
            }
            
        </section>
    )
}


BurgerConstructorElement.propTypes = {
    class: PropTypes.string,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    svg: PropTypes.bool
};

BurgerConstructorWpaper.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerConstructor;