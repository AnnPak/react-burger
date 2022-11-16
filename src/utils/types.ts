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
};

export type TMoveCard = (dragIndex:number, hoverIndex:number, constructorIngredients:TIngredient[]) => any;

export type BurgerConstructorElementProps = {
  ingredient: TIngredient;
  position?: string;
  classname?: string;
  index?: number;
  moveCard: TMoveCard;
};


export type TOptionsProps = {
  method: string
  mode: string
  headers: {
    "Content-Type" : string
    "Authorization"?: string | undefined
  }
  body: any
}