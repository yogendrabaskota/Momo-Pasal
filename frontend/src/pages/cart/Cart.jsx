import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../store/cartSlice';

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const removeItem = (productId)=>{
    //console.log("clicked")
    dispatch(remove(productId))

  }

  return (
    <div className="h-screen pt-20 bg-gray-100">
      <h1 className="mb-10 text-2xl font-bold text-center">Cart Items</h1>
      <div className="justify-center max-w-5xl px-6 mx-auto md:flex md:space-x-6 xl:px-0">
        
        <div className="rounded-lg md:w-2/3">
          {products.map((product) => (
            <div key={product._id} className="justify-between p-6 mb-6 bg-white rounded-lg shadow-md sm:flex sm:justify-start">
              <img src={product.productImage} alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{product.productName}</h2>
                  <p className="mt-1 text-xs text-gray-700">{product.productDescription}</p>
                </div>
                <div className="flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">-</span>
                    <input className="w-8 h-8 text-xs text-center bg-white border outline-none" type="number" value={product.quantity} min="1" readOnly />
                    <span className="px-3 py-1 duration-100 bg-gray-100 rounded-r cursor-pointer hover:bg-blue-500 hover:text-blue-50">+</span>
                  </div>
                  <div className="flex items-center space-x-4"  >
                    <button onClick={()=>removeItem(product._id)} className="w-5 h-5 duration-150 cursor-pointer hover:text-red-500" >Remove</button>
                  {/* <svg onClick={()=>removeItem(product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 duration-150 cursor-pointer hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg> */}
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-full p-6 mt-6 bg-white border rounded-lg shadow-md md:mt-0 md:w-1/3">
          <div className="flex justify-between mb-2">
            <p className="text-gray-700">Total Items</p>
            <p className="text-gray-700">{products.reduce((total, product) => total + product.quantity, 0)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total Price</p>
            <p className="text-lg font-bold">Rs. {products.reduce((total, product) => total + product.productPrice * product.quantity, 0)}</p>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
