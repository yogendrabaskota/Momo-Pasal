import { createBrowserRouter }  from "react-router-dom"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"


const router = createBrowserRouter([
    {
        path : "/",
        element : <Home />
    },
    {
        path : "/cart",
        element : <Cart /> 
    }
])

export default router