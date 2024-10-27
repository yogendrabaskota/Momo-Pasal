
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'


import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Navbar from './globals/components/navbar/Navbar'
import { Provider } from 'react-redux'
import store from './store/store'


function App() {
 

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
      
    
    
    </BrowserRouter>
    </Provider>
    </>


      
    
  )
}

export default App
