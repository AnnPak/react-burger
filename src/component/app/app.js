import { useEffect, useState } from 'react'
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import requestData from '../../utils/request';
import { ingredientsApi } from '../../utils/constants';
import Preloader from '../preloader/preloader';
import { IngredientsContext } from '../../services/ingredients-context';
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed } from '../../services/actions/index'

import styles from './app.module.scss';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsRequest());

    requestData(ingredientsApi)
      .then(data => dispatch(getIngredientsSuccess(data.data)))
      .catch(() => dispatch(getIngredientsFailed()))

  }, [])

  // const SetContent = () => {
  //   switch (status) {
  //     case 'loading':
  //       return <Preloader />
  //     case 'done':
  //       return (
  //         <main className={styles.burgerSection}>
  //             <BurgerIngredients />

  //             <IngredientsContext.Provider value={[data.data, setData]}>
  //               <BurgerConstructor />
  //             </IngredientsContext.Provider>

  //         </main>
  //       )
  //     case 'error':
  //       return (
  //           <p className="text text_type_main-medium">
  //             <InfoIcon type="error" />
  //             Ошибка!
  //           </p>
  //         )
  //     default:
  //         break;
  //   }
  // }


  return (
    <div className={styles.App}>
      <AppHeader />
      {/* <SetContent /> */}
      <main className={styles.burgerSection}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
