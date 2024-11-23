import React ,{ useState ,useEffect }from 'react';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Sales from './components/sales';
import './App.css';
import Shoes from './components/shoes';
import Fashion from './components/fashion';
import Electronics from './components/electronics';
import Watches from './components/watches';
import Header from './components/header';
import Bottom from './components/bottom';
import CarouselComponent from './components/carousel';
import Help from './components/help';
import Login from './components/login';
import Register from './components/registration';

import ProductDetail from './components/productdetail.js';
import Cart from './components/cart.js';


//UI component
import '@fontsource/inter';







function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = document.cookie.includes('is_logged_in=true');
    if (isLoggedIn) {
        navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="App">
      
      <Header setSearchQuery={setSearchQuery} />
      
      
      
        <Routes>
          <Route path='/home' element={<Sales searchQuery={searchQuery} />}></Route>
          <Route path='/shoes' element={<Shoes searchQuery={searchQuery} />}></Route>
          <Route path='/fashion' element={<Fashion searchQuery={searchQuery} />}></Route>
          <Route path='/electronics' element={<Electronics searchQuery={searchQuery} />}></Route>
          <Route path='/watches' element={<Watches searchQuery={searchQuery} />}></Route>
          <Route path='/help' element={<Help />}></Route>
          <Route path='' element={<Login />}></Route>
          <Route path='/registration' element={<Register />}></Route>
          <Route path='/products/:category/:id' element={<ProductDetail />}></Route> 
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
        
      
      <Bottom />
    </div>
  );
}

export default App;
