import { useState, useEffect } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { FaBars } from 'react-icons/fa'
import Spinner from "../../Products/Spinner"
import { useProducts } from "../../../Context/ProductsContext";

export default function CategoriesMenu () {
  const { products, loading } = useProducts()
  const [categoriesHideMenu, setCategoriesHideMenu] = useState(false)
  const location = useLocation()
  let uniqueCategories
  let uniqueSubCategories

  useEffect(() => {
    setCategoriesHideMenu(false);
  }, [location.search]);

  if(loading){
    return(<Spinner/>)
  }

  if(!loading){
    uniqueCategories = [...new Set(products.map(product => product.category))]
    uniqueSubCategories = [...new Set(products.map(product => product.sub_category))]
  }

  const handleClickCategories = () => setCategoriesHideMenu(!categoriesHideMenu)

  return(
    <>
    {/*Categorias hamburger hide menu*/}
      <div className='group rounded-full -tracking-widest'>
        <button
          onClick={handleClickCategories} 
          className={`group`}
        >
          <p className={`${categoriesHideMenu ? 'bg-page-lightblue rounded-full' : ''} group group-hover:bg-white flex items-center px-2 py-1 pl-3 duration-300 max-md:px-3 rounded-full`}>
            <FaBars className='group-hover:text-black duration-300'/>
            <span className="max-md:hidden group group-hover:text-black rounded-full p-1 px-2 duration-300">
              CATEGORIAS
            </span>
          </p>
        </button>

        {/*Categorias hide menu */}
        {categoriesHideMenu 
          && (
            <div className='absolute tracking-normal flex flex-col items-center rounded-md overflow-y-auto mt-[10px] overflow-x-hidden p-10 z-[99999999] bg-slate-100 min-w-[300px] max-w-[500px] w-[80%] max-sm:h-[300%] h-[250%]'>
              <section className='flex items-center flex-col gap-3 text-black h-[100% + 100px]'>
                <div className='h-full w-full flex justify-center border-b-[4px] border-page-lightblue'>
                  <NavLink 
                    to='/search' 
                    onClick={handleClickCategories} 
                    className='hover:text-page-lightblue max-sm:text-xl text-2xl duration-300 font-bold'>
                    Todos los productos
                  </NavLink>
                </div>

                {/*Mapear Categorias */}
                {uniqueCategories.map((category, index) => (
                <div className="w-full min-w-[280px] h-full" key={category}>
                  <ul className='flex flex-wrap justify-between py-4'>
                    <li className='hover:text-page-lightblue duration-300 border-b-[3px] border-page-blue-normal'>
                      <NavLink 
                        to={`/search/?category=${category.toLowerCase()}`} 
                        className={'font-semibold'}
                        onClick={handleClickCategories}>
                        {category.toUpperCase()}
                      </NavLink>
                    </li>
                  </ul>

                  {/*Mapear subcategorias */}
                  <ul className='flex flex-col gap-3 flex-wrap justify-between pl-2'>
                  {uniqueSubCategories
                    .filter(sub_category => products.some(product => product.category === category && product.sub_category === sub_category))
                    .map(sub_category => (
                      <li 
                        key={sub_category} 
                        className='hover:text-page-lightblue text-xs duration-300'>
                        <NavLink 
                          to={`/search/?category=${category.toLowerCase()}&sub_category=${sub_category.toLowerCase()}`}
                          onClick={handleClickCategories}>
                          {sub_category.replace(';', ',')}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                ))}
              </section>
            </div>
          )
        }
      </div>

      {/*Categorias for full screen and xl screen */}
      <section className='hidden tracking-tighter md:flex justify-center min-w-[200px] w-full'>
        <ul className='flex gap-x-2 max-[1024px]:text-sm'>
          {uniqueCategories.map((category) => (!category.includes('Cargar') &&
            <li 
              key={category.toLowerCase()}
              className='hover:bg-white whitespace-nowrap hover:text-black rounded-full p-1 px-2 duration-300'>
              <NavLink 
                to={`/search/?category=${category.toLowerCase()}`}>
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}