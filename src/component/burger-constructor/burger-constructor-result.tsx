import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classnames from "classnames";
import { TIngredient } from "../../utils/types";

import { addOrderToModal } from "../../redux/store/modal/slice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./burger-constructor.module.scss";
import { createOrder } from "../../redux/store/order/slice";

const BurgerConstructorResult: FC = () => {
    const { constructorIngredients, bun } = useAppSelector(
        (store: RootState) => store.burgerConstructor
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createNewOrder = () => {
        if (localStorage.getItem("isUserLogged") === "true") {
            dispatch(addOrderToModal());
            const constructorIngredientsIds = constructorIngredients
                ? constructorIngredients.map((item: TIngredient): string => item._id)
                : []; //список id ингредиентов
            const bunId = bun ? bun._id : null; // id булки
            const orderIngredientsIds = [bunId, ...constructorIngredientsIds, bunId]; //список всех id ингредиентов
            const isArrayEmpty = orderIngredientsIds.some(element => element === null);

            dispatch(
                createOrder({
                    ingredients: isArrayEmpty ? [null] : orderIngredientsIds,
                })
            )

            !isArrayEmpty && localStorage.removeItem("bun");
            !isArrayEmpty && localStorage.removeItem("constructorIngredients");

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

            <Button type="primary" size="large" htmlType="button" onClick={createNewOrder}>
                Оформить заказ
            </Button>
        </section>
    );
};

export default BurgerConstructorResult;
