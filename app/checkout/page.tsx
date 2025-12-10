"use client";

import { useCart } from "@/src/context/CartContext";
import Image from "next/image";
import iconDelete from "@/public/icon-delete.svg";
import { resolveImage } from "@/src/utils/resolveImage";
import SideBarCheckOut from "@/src/components/header/SideBarCheckOut";
import CardInfoPayment from "@/src/components/cart/CardInfoPayment";


function CheckoutPage() {
  const { items, getFinalItemPrice, removeItem, getTotalPrice, shipping } = useCart();


  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = getTotalPrice();
  const GRID_COLUMNS = "grid-cols-[50px_300px_80px_80px_80px] ";

  return (

    <section className="checkout-section flex flex-col lg:w-full lg:h-screen">

      <SideBarCheckOut />

      <h1 className="text-[2rem] font-bold p-5 ">Summary Cart</h1>

      <div className="container-checkout flex flex-col lg:flex-row  lg:gap-8 px-5 ">
        {/* Columna Izquierda: Información de Pago (Ajustada para mejor visualización) */}
        <div className="info-payment col-start-1 order-2 rounded-md lg:w-1/3 lg:h-150">
          <CardInfoPayment/>
        </div>
        {/* Columna Derecha: Lista de Productos y Resumen */}
        <div className="container-grid-checkout flex flex-col lg:w-2/3 w-1/1 h-auto">

          {/* Encabezados de la Tabla */}
          <div className={`checkout-header hidden lg:grid ${GRID_COLUMNS} text-sm font-semibold text-gray-500 border-b pb-2 mb-2`}>
            <span className="col-start-2">Description</span>
            <span className="col-start-3 text-center">Price</span>
            <span className="col-start-4 text-center">%0ff</span>
            <span className="col-start-5 text-center">You Pay</span>
            <span className="col-span-1"></span>
          </div>
          {/* Información productos carrito */}
          <ul className="flex flex-col items-left ">
            {items.map((i) => (
              <li key={i.product.id} className="leading-5 mb-2 mt-2 grid 
              grid-cols-[37px_fr_80px_30px] grid-rows-[20px_22px] 
              lg:grid-cols-[50px_300px_80px_80px_80px_80px] lg:grid-rows-1  items-center">
                {/*Image Product */}
                <div className="cart-image col-start-1 lg:row-start-1 row-span-2 flex items-center ">
                  <Image
                    alt="img-thumbnail-cart"
                    src={resolveImage(i.product.thumbnail)}
                    width={10}
                    className="thumbnail-cart h-8 w-8 object-cover rounded-md"
                    height={10}
                  /></div>

                {/*Title Product */}
                <p className="title-product flex flex-row items-center text-[.9rem] font-medium truncate
                col-start-2 row-start-1 
                lg:row-start-1  
                ">{i.product.title}</p>
                {/* original price */}
                <span className="original-price flex items-center lg:justify-center text-[.7rem] line-through
                col-start-2 row-start-2
                lg:col-start-3 lg:row-start-1">
                  {i.quantity} x ${Math.round(i.product.price)} </span>
                {/* discount price */}
                <p className="quantity-price  flex items-center lg:justify-center text-[.7rem] text-gray-500
                col-start-3 row-start-1
                lg:col-start-4 lg:row-start-1            
                ">{i.quantity} x ${getFinalItemPrice(i.product.price)}

                </p>
                <span className="total-discount-price flex text-[1rem] justify-center font-bold
                  col-start-2 row-start-2
                  lg:col-start-5 lg:row-start-1 
                ">${(getFinalItemPrice(i.product.price) * i.quantity).toFixed(2)}</span>

                {/*Delete product */}
                <button
                  onClick={() => removeItem(i.product.id)}
                  className="flex items-center justify-end cursor-pointer
                  col-start-4 row-span-2
                  lg:col-start-6 lg:row-start-1 ">
                  <Image
                    src={iconDelete}
                    alt="icon-delete"
                    width={10}
                    height={10}
                    className=" h-4 w-3 object-cover" />
                </button>
                <div className=" text-[.9rem]">

                </div>
              </li>
            ))}
          </ul>
          <hr className="text-grayish-blue" />
          {/* Muestra el total de todo el carrito */}
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-[.7rem]">Products: {totalQuantity}</h2>
            <div className="flex flex-col lg:w-1/4 ">
              <p className="flex justify-between">Subtotal: <span>${cartTotal.toFixed(2)}</span></p>
              <p className="flex justify-between">Shipping: <span> ${shipping}</span></p>
              <p className="flex justify-between items-center font-bold text-[1.8rem]">Total: <span className="font-bold text-[1.5rem]">${(cartTotal + shipping).toFixed(2)}</span>  </p>
            </div>
          </div>
             <hr className="text-grayish-blue mb-1" />
             <hr className="text-grayish-blue mb-5" />
        </div>

      </div>
    </section>
  );
}
export default CheckoutPage;