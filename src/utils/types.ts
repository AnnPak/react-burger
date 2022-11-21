export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    key: string | number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_large:string
};

export type TStringArray = {
    [name: string]: string;
};

export type TMoveCard = (
    dragIndex: number,
    hoverIndex: number,
    constructorIngredients: TIngredient[]
) => any;

export type TBurgerConstructorElementProps = {
    ingredient: TIngredient;
    position?: "top" | "bottom";
    classname?: string;
    index: number;
    moveCard: TMoveCard;
};

export type TTabsWrapper = {
    typesOfIngredients: Array<string> | null;
    tabsValue: string | null;
};

export type TScrollIntoViewOptions = boolean | ScrollIntoViewOptions;

export type TProfileFormInput = {
    value: string,
    isDisabled: boolean,
}

export type TModal = {
    title?: string;
    isRedirect?: boolean;
};

export type TLinkItem = {
    className: string;
    to: string;
};



