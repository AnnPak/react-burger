import PropTypes from 'prop-types';

export const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
});

export const ORDERS_API = 'https://norma.nomoreparties.space/api/orders';
export const INGREDIENTS_API = 'https://norma.nomoreparties.space/api/ingredients';
