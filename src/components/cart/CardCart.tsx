"use client";
import Image from "next/image";
import { useCart } from "@/src/context/CartContext";
import iconDelete from "@/public/icon-delete.svg";
import Link from "next/link";
import { resolveImage } from "@/src/utils/resolveImage";

export default function CartCard() {

  const { items, removeItem, clearCart, getTotalPrice, getFinalItemPrice } = useCart();

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = getTotalPrice();


  return (
    <div className="cart-card  bg-light-grayish-blue p-5 rounded-lg w-80 shadow-lg">
      <div className="flex flex-row w-full items-center font-bold mb-3">
        <h2 className=" col-span-3 row-start-1 text-xl text-dark-grayish-blue font-bold w-50">Cart </h2>
        <span className="text-[.7rem]">Price</span>
      </div>
      <hr className="text-grayish-blue" />
      {items.length === 0 ? (
        <p className="col-span-3 row-start-2 text-gray-500">Your cart its empty</p>
      ) : (
        <>
          <ul className="">
            {items.map((i) => (
              <li key={i.product.id} className=" grid grid-cols-[37px_155px_60px_20px] grid-rows-[20px_22px] leading-5 mb-2 mt-2">
                {/*Image Product */}
                <div className="cart-image col-start-1 row-span-2 flex items-center ">
                  <Image
                    alt="img-thumbnail-cart"
                    src={resolveImage(i.product.thumbnail)}
                    width={10}
                    className="thumbnail-cart h-8 w-8 object-cover"
                    height={10}
                  /></div>

                {/*Title Product */}
                <p className="title-product col-start-2 flex items-center text-[.9rem] font-medium truncate">{i.product.title}</p>
                {/* original price */}
                <span className="original-price col-start-3 flex items-center justify-center text-[.7rem] line-through">
                  {i.quantity} x ${Math.round(i.product.price)} </span>
                {/* discount price */}

                <p className="quantity-price col-start-2 row-start-2 flex items-center gap-5 text-[.7rem] text-gray-500"> {i.quantity} x
                  ${getFinalItemPrice(i.product.price)}
                  <span className="total-discount-price col-start-2 row-start-2 text-[1rem] font-bold">  ${(getFinalItemPrice(i.product.price) * i.quantity).toFixed(2)}</span>

                </p>

                {/*Delete product */}
                <button
                  onClick={() => removeItem(i.product.id)}
                  className="col-start-4 row-span-2 flex items-center justify-end cursor-pointer">
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
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-[.7rem]">Products: {totalQuantity}</h2>
            <span className="font-bold">Total:  ${cartTotal.toFixed(2)}</span>
          </div>
          <Link href={"/checkout"}>
            <button
              className="bg-orange text-very-dark-blue font-bold rounded p-2 w-full cursor-pointer disabled:bg-pale-orange "
              type="submit"
              name="checkout"
              
            >
              Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};