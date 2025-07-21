
import { Link, useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate();


  return (
   

        <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-xl font-bold text-red-700 ">
                    History
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-600">
                    Here is the overview of your activities:
                    </p>
                </div> 
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <div onClick={()=>navigate('/myorders')} className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" style ={{border:'1px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    
                    <Link to='/myorders'  className="text-base font-medium text-red-700 ">
                        My Orders
                    </Link>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" style ={{border:'1px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    
                    <Link to='/myorders'  className="text-base font-medium text-red-700 ">
                        My Orders
                    </Link>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none" style ={{border:'1px solid black', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    
                    <Link to='/myorders'  className="text-base font-medium text-red-700 ">
                        My Orders
                    </Link>
                    </div>

                   

                    

                    

                   

                  
                </div>
            </div>  
            <p className="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" className="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>  
        </div>
  
  )
}

export default UserProfile