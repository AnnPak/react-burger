import { useEffect, useState } from 'react'
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import requestData from '../../utils/request';
import { ingredientsApi } from '../../utils/constants';
import Preloader from '../preloader/preloader';
import { IngredientsContext } from '../../services/ingredients-context';

import styles from './app.module.scss';


function App() {
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setStatus('loading');
    requestData(ingredientsApi, setData, setStatus)
  }, [])

  const SetContent = () => {
    switch (status) {
      case 'loading':
        return <Preloader />
      case 'done':
        return (
            <main className={styles.burgerSection}>
                <BurgerIngredients data={data.data} />

                <IngredientsContext.Provider value={[data.data, setData]}>
                  <BurgerConstructor />
                </IngredientsContext.Provider>
              
            </main>
        )
      case 'error':
        return (
            <p className="text text_type_main-medium">
              <InfoIcon type="error" />
              Ошибка!
            </p>
          )
      default:
          break;
    }
  }


  return (
    <div className={styles.App}>
      <AppHeader />
      <SetContent />
    </div>
  );
}

export default App;
