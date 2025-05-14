import axios from "axios"
import { NavLink } from "react-router-dom"
import useFormattedPrice from '../Utils/useFormattedPrice'
import useCleanEan from '../Utils/useCleanEan'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export default function ProductCard({ product }) {
  const addViewToProduct = () => {
    axios.patch(`${API_URL}/api/products/addView/${product.id}`)
    .then(res => {
      if(res.status !== 200){
        return console.log(res)
      }
      // console.log('view updated')
    })
    .catch(e => console.error('Error al sumar view al producto: ', e))
  }

  return(
    <NavLink
      to={`/products/?product=${product.sku}`} 
      onClick={addViewToProduct}
      className="flex flex-col hover:scale-105 box-border items-center justify-between bg-white p-2 mx-auto duration-300 hover:cursor-pointer shadow-border border-2 rounded-md h-[400px] max-sm:h-[350px] w-[270px] max-md:max-w-[100%] my-4"
    >     
      <header className="relative w-full flex-grow-[0.55] box-border">
        <img 
          src={product.img_url ? product.img_url : `https://real-color.com.ar/banners-images/Assets/page_icon.webp`}
          alt={product.name}
          className="w-full h-full object-contain max-h-[250px] rounded-lg"
          onError={(e) => e.target.src = `https://real-color.com.ar/banners-images/Assets/page_icon.webp`}
        />
        <img className="absolute top-1 right-1 object-contain h-10 w-10 rounded-lg" src="https://technologyline.com.ar//banners-images/Assets/sale-icon.svg"/>
      </header>

      <article className="w-full flex-grow-[0.35] box-border flex flex-col justify-between">
        <p className="flex flex-col">
          <span className="text-xs text-gray-500 max-sm:text-[9px]">SKU: {product.sku}</span>
          <span className="line-clamp-2 font-medium max-sm:text-[10px]">{useCleanEan(product.name)}</span>
        </p> 
        <p className="font-bold text-xl max-sm:text-base">${product.price_list_1 ? useFormattedPrice(product.price_list_1) : '  -  -  -  -  -  -'}</p>
      </article>
    </NavLink>
  )
}