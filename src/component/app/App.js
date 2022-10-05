import { useEffect, useState } from 'react'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import requestData from '../../utils/request';
import Preloader from '../preloader/preloader';

import styles from './App.module.scss';


function App() {
  const [status, setStatus] = useState('');
  const [data, setData] = useState()

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    setStatus('loading');

    requestData(url, setData, setStatus)
  }, [])

  const SetContent = () => {
    switch (status) {
      case 'loading':
        return <Preloader />
      case 'done':
        return (
          <>
            <main className={styles.burgerSection}>

              <BurgerIngredients data={data} />
              <BurgerConstructor data={data} />
            </main>
          </>
        )
      case 'error':
        return 'Ошибка'
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
