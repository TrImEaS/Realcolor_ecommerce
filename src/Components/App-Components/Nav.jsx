import { NavLink } from 'react-router-dom'
import { useCart } from '../../Context/CartContext.jsx';
import { FaArrowUp, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import SearchInput from './Nav-Components/SearchInput.jsx'
import CategoriesMenu from './Nav-Components/CategoriesMenu.jsx'
import MiniCart from '../../Pages/MiniCart.jsx';
import { PiUserCircleFill } from 'react-icons/pi';
import HotSale from '../../Components/HotSale.jsx'
import { useAuth } from "../../Context/AuthContext";

export default function Nav() {
  const { userIsLoged } = useAuth();
  const { getTotalOfProducts } = useCart()
  const [showCart, setShowCart] = useState(3)
  const [location, setLocation] = useState('/login')

  useEffect(() => {
    if (!userIsLoged) {
      setLocation('/login');
    } 
    else {
      setLocation('/myaccount');
    }
  }, [userIsLoged]);

  return (
    <nav className='z-50 flex flex-col w-full relative items-center'>
      {/* <HotSale/> */}
      <NavLink to='/shipments' className='flex z-50 h-8 text-center max-sm:h-10 gap-2 px-3 max-sm:gap-1 max-sm:px-5 cursor-pointer bg-slate-200 w-full items-center text-slate-900 justify-center text-[14px] max-sm:text-[12px]'>
        <FaArrowUp className='text-[10px] mt-1 animate-bounce'/>
        <span className='select-none font-medium duration-300'>Envios a todo el pais con precio promocional a las sigueintes localidades</span>
        <FaArrowUp className='text-[10px] mt-1 animate-bounce'/>
      </NavLink>

      <section className='flex gap-x-5 max-sm:gap-x-2 max-sm:max-h-[100px] justify-between items-center h-28 w-3/4 max-lg:w-full px-2 max-sm:px-0'>
        <NavLink to='/' className='h-[100px] min-w-[200px] max-sm:w-[180px] flex items-center max-xl:justify-center'>
          <img src="https://real-color.com.ar/banners-images/Assets/logo_azul.svg" alt="company-logo" className='max-sm:w-[90%] w-full max-sm:max-w-[200px] max-w-[200px] pb-3'/>
        </NavLink>

        {/*Search input*/}
        <div className='max-md:hidden flex w-full max-w-[600px] justify-center items-center mt-3'>
          <SearchInput/> 
        </div>

        {/*User items */}
        <article className='flex gap-x-6 max-sm:gap-x-3 pr-5 max-sm:pr-8 items-center mt-[8px] w-fit'>
          <div className='flex text-black items-center w-full gap-2 justify-between max-sm:justify-end'>
            <NavLink to={location} className='flex items-center'>
              <button className='flex items-center text-nowrap gap-1 text-opacity-15 hover:scale-110 duration-300' title='Ir a mi cuenta'>
                <PiUserCircleFill className='text-3xl text-page-blue-dark'/>
              </button>
            </NavLink>

            <button 
              className='text-2xl relative hover:scale-110 duration-300'
              onClick={()=> setShowCart(true)}
              title='Ir al carrito'
            >
              <span className='bg-white w-5 h-5 text-black text-xs flex justify-center items-center -top-2 -right-3 rounded-full border border-page-blue-dark absolute'>
                {getTotalOfProducts()}
              </span>

              <FaShoppingCart className='text-page-blue-dark' />
            </button>
          </div>
        </article>
      </section>

      {/*---Nav bottom Full Screen---*/}
      <section className='hidden md:flex z-50 w-full items-center justify-around gap-x-5 text-slate-50 text-[15px] bg-color'>
        <article className='w-3/4 max-lg:w-full px-10 flex h-[60px] items-center justify-around min-w-[640px]'>
          <CategoriesMenu/>
        </article>
      </section>

      {/*---Nav bottom  MD screen---*/}
      <section className='md:hidden flex h-[50px] w-full items-center justify-between text-slate-50 max-sm:justify-between max-md:px-5 max-sm:px-2 max-sm:pl-4 bg-color'> 
        {/* Categorias */}
        <CategoriesMenu/>        
        
        <article className='flex items-center w-full rounded-full max-sm:hover:w-full duration-300 max-sm:w-fit'>
          <SearchInput/>
        </article>
      </section>

      <MiniCart showCart={showCart} setShowCart={setShowCart}/>
    </nav>
  )
}
