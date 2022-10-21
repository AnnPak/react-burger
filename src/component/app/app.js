import { useCallback, useEffect } from 'react'
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import requestData from '../../utils/request';
import { ingredientsApi } from '../../utils/constants';
import Preloader from '../preloader/preloader';
import { getIngredientsRequest, getIngredientsSuccess, getIngredientsFailed } from '../../store/ingredients/slice'

import styles from './app.module.scss';


function App() {

  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getIngredientsRequest());

    requestData(ingredientsApi)
      .then(data => dispatch(getIngredientsSuccess(data.data)))
      .catch(() => dispatch(getIngredientsFailed()))

  }, [dispatch])

  const SetContent = useCallback(() => {

    return (
      <>
        {isLoading && <Preloader />}

        {!isLoading && 
        <DndProvider backend={HTML5Backend}>
          <main className={styles.burgerSection}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>}

        {isError &&
          <p className="text text_type_main-medium">
            <InfoIcon type="error" />
            Ошибка!
          </p>}

      </>
    )
  }, [isLoading, isError])


  return (
    <div className={styles.App}>
      <AppHeader />
      <SetContent />
    </div>
  );
}

export default App;
