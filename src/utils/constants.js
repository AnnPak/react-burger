import PropTypes from 'prop-types';

export const DATA_PROPS_TYPE = PropTypes.shape({
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

export const TITLE_LIST = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
};

const BASE_URL = "https://norma.nomoreparties.space/api";

export const ORDERS_API = `${BASE_URL}/orders`;
export const INGREDIENTS_API = `${BASE_URL}/ingredients`;

export const LOGIN_API = `${BASE_URL}/auth/logins`;
export const REGISTER_API = `${BASE_URL}/auth/register`;
export const LOGOUT_API = `${BASE_URL}/auth/logout`;
export const TOKEN_API = `${BASE_URL}/auth/token`;