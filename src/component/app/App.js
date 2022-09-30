import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../utils/data';

import styles from'./App.module.scss';

function App() {
  return (
    <main className={styles.App}>
      <AppHeader/>
      <section className={styles.burgerSection}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
      </section>
    </main>
  );
}

export default App;
