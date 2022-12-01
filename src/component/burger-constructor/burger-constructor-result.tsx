import { FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { TIngredient } from "../../utils/types";

import { addOrderToModal } from "../../redux/store/modal/slice";
import { fetchOrder } from "../../redux/store/order/slice";
import { getCookie } from "../../utils/cookie";
import { AppDispatch, RootState } from "../../redux/store";

import styles from "./burger-constructor.module.scss";

const BurgerConstructorResult: FC = () => {
    const { constructorIngredients, bun } = useSelector((store: RootState) => store.burgerConstructor);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const createOrder = () => {
        if (localStorage.getItem("isUserLogged") === "true") {
            dispatch(addOrderToModal());
            const constructorIngredientsIds = constructorIngredients
                ? constructorIngredients.map((item: TIngredient): string => item._id)
                : []; //список id ингредиентов
            const bunId = bun ? bun._id : null; // id булки
            const orderIngredientsIds = [bunId, ...constructorIngredientsIds, bunId]; //список всех id ингредиентов

            dispatch(
                fetchOrder({
                    ingredients: orderIngredientsIds,
                    Authorization: `${getCookie("accessToken")}`,
                })
            );
        } else {
            navigate("/login", { replace: true });
        }
    };

    const fullprice = useMemo(() => {
        const ingredientsPrice = constructorIngredients
            ? constructorIngredients
                  .map((item: TIngredient): number => item.price)
                  .reduce((prev: number, curr: number): number => prev + curr, 0)
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
