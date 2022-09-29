import React from 'react';
import AppHeader from '../AppHeader/appHeader';
import BurgerIngredients from '../BurgerIngredients/burgerIngredients';
import data from '../../utils/data';
import './App.css';

function App() {
  return (
    <main className="App">
      <AppHeader/>
      <section className='burgerSection'>
          <BurgerIngredients data={data}/>
      </section>
    </main>
  );
}

export default App;
