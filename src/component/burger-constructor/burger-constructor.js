import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import dataPropTypes from '../../utils/constants';
import Modal from '../modal/modal';

import styles from './burger-constructor.module.scss';
import doneImg from '../../images/done.png'


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

const BurgerConstructorResult = ({openModal}) => {
    return (
        <section className={classnames(styles.constructorResult, 'mt-10')}>
            <div className={classnames(styles.constructorResultPrice, 'mr-10')}>
                <p className="text text_type_main-large mr-2">610</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button type="primary" 
                    size="large" 
                    htmlType='button'
                    onClick={openModal}>
                Оформить заказ
            </Button>
        </section>

    )
}

const ModalIngredientInf = ({ isModalOpen, closeModal }) => {

    return (
        <>
            <Modal isModalOpen={isModalOpen} closeModal={closeModal}>

                <div className={styles.constructorModalId}>
                    <p className={classnames("text text_type_digits-large mt-8", styles.orderNumber)}>034536</p>

                    <p className="text text_type_main-medium mt-9">
                        идентификатор заказа
                    </p>
                </div>


                <img src={doneImg} className={styles.constructorModalImg}/>

                <div className={classnames("mt-15 mp-10", styles.orgerInfo)}>
                    <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                    <p className={classnames("text text_type_main-default text_color_inactive", styles.orderNumber)}>Дождитесь готовности на орбитальной станции</p>
                </div>

            </Modal>
        </>
    )
}

const BurgerConstructor = ({data}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <section className={classnames('mt-25', styles.burgerSectionConstructor)}>
            <BurgerConstructorWpaper data={data}/>
            <BurgerConstructorResult openModal={openModal}/>

            <ModalIngredientInf data={data}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal} />
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

ModalIngredientInf.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;