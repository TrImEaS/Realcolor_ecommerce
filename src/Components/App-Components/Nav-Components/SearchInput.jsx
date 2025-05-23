import { FaSearch } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useProducts } from '../../../Context/ProductsContext';
import useFormattedPrice from '../../../Utils/useFormattedPrice'
import useCleanEan from '../../../Utils/useCleanEan'
import Spinner from '../../Products/Spinner'

export default function SearchInput() {
  const [keyword, setKeyword] = useState('')
  const [searchMenu, setSearchMenu] = useState(false)
  
  const inputRef = useRef(null)
  const navigate = useNavigate()
  
  const handleChange = (e) => setKeyword(e.target.value)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/?search=${keyword}`)
    setKeyword('')
  }

  const handleFocusMenu = () => setSearchMenu(true)

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSearchMenu(false)
    }
  }

  useEffect(() => {
    setSearchMenu(false)
  }, [location.search, navigate])

  useEffect(() =>{
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  },[])

  return(
    <form 
      className='flex relative rounded-full bg-gray-100 max-sm:bg-transparent group flex-col w-full text-black gap-2 justify-between duration-500 items-center px-2 z-[9999]'
      onSubmit={handleSubmit}
      ref={inputRef}
    >
      <label htmlFor='inputSearch' className='flex w-full group sm:px-2 items-center min-w-8 rounded-full duration-500 justify-end'>
        <span className='max-sm:text-white duration-500 max-sm:h-8 max-sm:rounded-r-none max-sm:mb-[1px] max-sm:group-hover:bg-gradient-to-b from-[#1a4167] to-page-blue-normal max-sm:group-hover:w-10 text-lg sm:pr-5 max-sm:group-hover:p-1 rounded-full flex items-center justify-center cursor-pointer'>
          <FaSearch/>
        </span>
        
        <input 
          type="text" 
          id='inputSearch'
          className='w-full max-sm:w-0 max-sm:group-hover:w-full max-sm:px-2 max-sm:bg-transparent max-sm:group-hover:bg-gray-100 duration-500 max-sm:rounded-l-none placeholder:text-gray-500 rounded-full bg-gray-100 outline-none py-1'
          placeholder='Buscar'
          value={keyword}
          onChange={handleChange}
          onFocus={handleFocusMenu}
        />
      </label>
      {searchMenu !== false && keyword !== '' && <SearchResults keyword={keyword} setKeyword={setKeyword} />}
    </form>
  )
}

function SearchResults({ keyword, setKeyword }) {
  const { products, loading } = useProducts()

  if(loading){
    return(
      <section className='flex flex-col absolute top-10 gap-2 w-full max-w-[600px] bg-white border-2 rounded-lg z-[9999] overflow-y-auto p-3 h-[500px]'>
        <Spinner />
      </section>
    )
  }

  const filteredProducts = products.filter(product => {
    const searchWords = keyword.toLowerCase().split(' ').filter(Boolean);
    const target = `${product.name} ${product.sku} ${product.sub_category}`.toLowerCase();
    return searchWords.every(word => target.includes(word));
  });

  return (
    <section className={`flex flex-col absolute top-9 gap-2 w-full max-w-[600px] min-h-[100px] bg-white border-2 rounded-lg z-[9999] overflow-y-auto p-3 ${filteredProducts.length === 0 ? 'h-14' : 'h-[500px]'}`}>
    {filteredProducts.length === 0 
    ? (
      <div>
        <p className='font-bold text-lg'>
          No se encontraron resultados...
        </p>
      </div>
    ) 
    : (
      filteredProducts.map((product) => (
        <NavLink 
          to={`/products/?product=${product.sku}`}
          key={product.id}
          onClick={()=> setKeyword('')}
          className="flex box-border items-center justify-between bg-white p-1 duration-500 border-2 rounded-sm hover:cursor-pointer z-[99999] w-full min-h-[180px] max-h-[150px] shadow-border">
          <header className="relative w-[50%] h-full box-border">
            <img 
              src={product.img_url} 
              loading="eager"
              alt={product.name}
              onError={(e) => e.target.src = 'https://technologyline.com.ar/banners-images/Assets/page-icon.jpeg'}
              className="w-full h-full object-contain" />
          </header>

          <article className="w-[50%] h-full box-border flex flex-col justify-between">
            <p className='flex flex-col text-sm'>
              <span className='text-xs text-gray-500'>SKU: {product.sku}</span>
              <span className='line-clamp-3'>{useCleanEan(product.name)}</span>
            </p>
            <p className="font-bold text-xl max-[1025px]:text-sm">${useFormattedPrice(product.price_list_1)}</p>
          </article>
        </NavLink>
      ))
    )}
    </section>
  )
}