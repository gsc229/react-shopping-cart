import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
// contexts
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = item => {
    setCart([...cart, item]);
  };

  const removeItem = id => {
    const filteredCart = cart.filter(item => item.id !== id);
    setCart(filteredCart);
  };

  return (
    <div className='App'>
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={cart}>
          <Navigation />
        </CartContext.Provider>
      </ProductContext.Provider>

      {/* Routes */}
      <ProductContext.Provider value={{ products, addItem }}>
        <Route exact path='/' component={Products} />
      </ProductContext.Provider>
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Route path='/cart' component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
