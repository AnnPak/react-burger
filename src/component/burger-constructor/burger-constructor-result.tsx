import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { TIngredient } from "../../utils/types";

import { addOrderToModal } from "../../store/modal/slice";
import { fetchOrder } from "../../store/order/slice";
import { getCookie } from "../../utils/cookie";

import styles from "./burger-constructor.module.scss";

const BurgerConstructorResult = () => {
    const { constructorIngredients, bun } = useSelector((store) => store.burgerConstructor);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const createOrder = () => {
        if (localStorage.getItem("isUserLogged") === "true") {
            dispatch(addOrderToModal());
            const constructorIngredientsIds = constructorIngredients
                ? constructorIngredients.map((item:TIngredient):string => item._id)
                : []; //список id ингредиентов
            const bunId = bun ? bun._id : null; // id булки
            const orderIngredientsIds = [bunId, ...constructorIngredientsIds, bunId]; //список всех id ингредиентов

            const requestBody = JSON.stringify({
                ingredients: orderIngredientsIds,
                Authorization: getCookie("accessToken"),
            });

            dispatch(fetchOrder(requestBody));
        } else {
            navigate("/login");
        }
    };

    const fullprice = useMemo(() => {
        const ingredientsPrice = constructorIngredients
            ? constructorIngredients
                  .map((item:TIngredient):number => item.price)
                  .reduce((prev:number, curr:number):number => prev + curr, 0)
            : 0;
        const bunPrice = bun ? bun.price : 0;

        return ingredientsPrice + bunPrice * 2;
    }, [constructorIngredients, bun]);

    return (
        <section className={classnames(styles.constructorResult, "mt-10")}>
            <div className={classnames(styles.constructorResultPrice, "mr-10")}>
                <p className="text text_type_main-large mr-2">{fullprice}</p>
                <CurrencyIcon type="primary" />
            </div>

            <Button type="primary" size="large" htmlType="button" onClick={createOrder}>
                Оформить заказ
            </Button>
        </section>
    );
};

export default BurgerConstructorResult;
