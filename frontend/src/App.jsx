
import { RouterProvider } from 'react-router-dom'
import './App.css'

import router from './router'
import Navbar from './globals/components/navbar/Navbar'

function App() {
 

  return (
    <>
    <Navbar />
      <RouterProvider router={router} />
      
    </>
  )
}

export default App
