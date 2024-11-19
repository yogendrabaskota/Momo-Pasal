import {  useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from "../../../store/authSlice"
import { useEffect } from "react"
import { fetchCartItems } from "../../../store/cartSlice"
//import { fetchCartItems } from "../../../store/cartSlice"

const Navbar = () => {

    const {data:user} = useSelector((state)=>state.auth)
    
    const navigate = useNavigate()
    const {items} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    // const dispatch = useDispatch()
   


    // useEffect(()=>{
    //     dispatch(fetchCartItems())
      
    //  },[dispatch])


    const handleLogout = ()=>{
        //empty data
        dispatch(logOut())




        //remove localstorage
        localStorage.removeItem('token')
        navigate("/login")
    }

    useEffect(()=>{
        dispatch(fetchCartItems())
    },[dispatch])


  return (
    <nav className="fixed z-10 w-full bg-white md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
            <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
                <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
                    <a onClick={()=>navigate("/")} aria-label="logo" className="flex space-x-2 items-center">
                        <img src="https://tailus.io/sources/blocks/food-delivery/preview/images/icon.png" className="w-12" alt="tailus logo" width="144" height="133" />
                        <span className="text-2xl font-bold text-yellow-900">MOMO <span className="text-yellow-700">Pasal</span></span>
                    </a>

                    <button aria-label="humburger" id="hamburger" className="relative w-10 h-10 -mr-2 lg:hidden">
                        <div aria-hidden="true" id="line" className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transtion duration-300"></div>
                        <div aria-hidden="true" id="line2" className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transtion duration-300"></div>
                    </button>
                </div>

                <div className="hidden w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
                    <div className="text-gray-600 lg:pr-4">
                        <ul className="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                            <li>
                                <Link to="/profile" className="block md:px-4 transition hover:text-yellow-700">
<span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="block md:px-4 transition hover:text-yellow-700">
<span>Wishlist</span>
                                </a>
                            </li>
                            {
                                items.length !== 0 && (
                                    <li>
                                <a onClick={()=>navigate("/cart")} className="block md:px-4 transition hover:text-yellow-700">
<span>Cart <sup>{items.length}</sup></span>
                                </a>
                            </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l" >
                        

                    {
                        user.length == 0 || (localStorage.getItem('token') == "" || localStorage.getItem("token") == null || localStorage.getItem('token') == undefined) ? 
                        
                        (
                            <>
                            <button onClick={()=>navigate("/register")} type="button" title="Start buying" className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max">
                            <span className="block text-yellow-800 font-semibold text-sm">
                                Sign up
                            </span>
                        </button>
                        <button onClick={()=>navigate("/login")} type="button" title="Start buying" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max">
                            <span className="block text-yellow-900 font-semibold text-sm">
                                Login
                            </span>
                        </button>
                        </>
                        ):
                        <button onClick={handleLogout} type="button" title="Start buying" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max">
                            <span className="block text-yellow-900 font-semibold text-sm">
                                Logout
                            </span>
                        </button>
                        
                        
                        
                    }

                        
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar