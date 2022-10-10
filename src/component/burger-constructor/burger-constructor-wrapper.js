import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import dataPropTypes from '../../utils/constants';

import styles from './burger-constructor.module.scss';


const BurgerConstructorElement = ({ text, ...props }) => {

    const { svg, isLocked, type, price, thumbnail, classname } = props;

    switch (type) {
        case 'top':
            text = text + ' (верх)';
            break;
        case 'bottom':
            text = text + ' (низ)';
            break;
        default:
    }

    return (
        <section className={classname}>
            {svg && <DragIcon className={styles.dragIcon} />}

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

const BurgerConstructorWpaper = ({resultIngredientsData}) => {

    const elementTypeBun = resultIngredientsData.find(item => item.type === 'bun');

    return (

        <section className={styles.constructorElements}>

            {
                <BurgerConstructorElement
                    classname={classnames(styles.constructorElement, styles.constructorLockElement, 'pr-4')}
                    key={elementTypeBun._id}
                    type='top'
                    isLocked={true}
                    text={elementTypeBun.name}
                    price={elementTypeBun.price}
                    thumbnail={elementTypeBun.image} />

            }

            <div className={classnames(styles.constructorElements, 'pr-2')}>
                {

                    resultIngredientsData.filter(item => item.type !== 'bun').map((item) => {
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
                    key={elementTypeBun._id + 'n2'}
                    type='bottom'
                    isLocked={true}
                    text={elementTypeBun.name}
                    price={elementTypeBun.price}
                    thumbnail={elementTypeBun.image} />

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
    resultIngredientsData: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerConstructorWpaper;