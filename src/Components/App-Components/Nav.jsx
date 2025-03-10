import { NavLink } from 'react-router-dom'
import { useCart } from '../../Context/CartContext.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import SearchInput from './Nav-Components/SearchInput.jsx'
import CategoriesMenu from './Nav-Components/CategoriesMenu.jsx'
import MiniCart from '../../Pages/MiniCart.jsx';

export default function Nav() {
  const { getTotalOfProducts } = useCart()
  const [showCart, setShowCart] = useState(3)

  return (
    <nav 
      className='z-50 flex flex-col w-full relative items-center bg-white'>
    {/*---Nav top---*/}
      <section className='flex gap-x-5 max-sm:gap-x-2 max-sm:max-h-[100px] justify-between max-sm:justify-center items-center h-28 w-3/4 max-lg:w-full px-2 max-sm:px-0'>
        {/*Logo*/}
        <NavLink to='' className='h-[100px] flex items-center max-xl:justify-center'>
          <img src="https://real-color.com.ar/banners-images/Assets/logo_azul.svg" alt="company-logo" className='w-[200px] max-w-[200px] '/>
        </NavLink>


        {/*Search input*/}
        <div className='max-md:hidden flex w-full max-w-[600px] justify-center items-center mt-3'>
          <SearchInput/> 
        </div>
        {/*User items o Link to realcolor shop*/}
        <article className='flex gap-x-6 max-sm:gap-x-3 pr-3 items-center mt-[8px] w-[190px]'>
          <div className='flex text-white items-center w-full gap-2 justify-between max-sm:justify-end'>
            {/* <button disabled className='flex items-center text-nowrap gap-1 text-opacity-15' title='Lo sentimos, esta opcion esta en mantenimiento, opcion en mantenimiento'>
              <PiUserCircleFill className='text-3xl'/>
              <span className='max-sm:hidden'>Mi cuenta</span>
            </button> */}

            <button 
              className='text-2xl relative hover:scale-110 duration-300'
              onClick={()=> setShowCart(true)}
              title='Ir al carrito'
            >
              <span className='bg-white w-5 h-5 text-black text-xs flex justify-center items-center -top-2 -right-3 rounded-full border-2 border-page-blue-normal absolute'>
                {getTotalOfProducts()}
              </span>

              <FaShoppingCart className='text-page-blue-normal'/>
            </button>
          </div>
        </article>
      </section>

      {/*---Nav bottom Full Screen---*/}
      <section className='hidden md:flex z-50 w-full items-center justify-around gap-x-5 bg-page-blue-normal text-slate-50 text-[15px]'>
        <article className='w-3/4 max-lg:w-full px-10 flex h-[60px] items-center justify-around min-w-[640px]'>
          <CategoriesMenu/>
        </article>
      </section>

      {/*---Nav bottom  MD screen---*/}
      <section className='md:hidden flex h-[50px] w-full items-center justify-center bg-page-blue-normal text-slate-50 max-md:justify-start max-sm:justify-between max-md:px-20 max-sm:px-2'>
        {/* Categorias */}
        <CategoriesMenu/>        
        
        <article className='flex items-center rounded-full w-full'>
          <SearchInput/>
        </article>
      </section>

      <MiniCart showCart={showCart} setShowCart={setShowCart}/>
    </nav>
  )
}
