
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'


import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Navbar from './globals/components/navbar/Navbar'
import { Provider } from 'react-redux'
import store from './store/store'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import ProductDetails from './pages/productDetails/ProductDetails'


function App() {
 

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
    </Routes>
      
    
    
    </BrowserRouter>
    </Provider>
    </>


      
    
  )
}

export default App
