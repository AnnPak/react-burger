import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../utils/data';

import styles from'./App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <AppHeader/>
      <main className={styles.burgerSection}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
