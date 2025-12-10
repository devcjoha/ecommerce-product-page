"use client";
import Image from "next/image";
import iconPaypal from "@/public/icon-paypal.svg";
import iconCreditCard from "@/public/icon-credit-card.svg";
import { generateYearOptions } from "@/src/utils/generateYearOptions";
import { useCart } from "@/src/context/CartContext";
import { useRouter } from "next/navigation";


function CardInfoPayment() {
  const { clearCart } = useCart();
  const router = useRouter();

  const CURRENT_YEAR = new Date().getFullYear();
  const YEAR_OPTIONS = generateYearOptions(CURRENT_YEAR, 12);

  const handleSubmitInfoPayment = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    alert("Pago realizado ✅");
    clearCart();
    router.push("/");
  };

  return (
    <div className="card-info-paymet flex flex-col bg-light-grayish-blue p-5 rounded-lg w-full h-full shadow-lg justify-around">
      <span>Payment Method:</span>
      <div className="flex flex-row w-full justify-evenly lg:mt-5 lg:mb-5 mt-3 mb-3 ">
        <div className="flex items-center justify-center border border-grayish-blue w-25 h-12 rounded-xl ">
          <Image
            src={iconPaypal}
            alt="img-credit-card"
            width={10}
            className="image-credit-card h-15 w-15 object-cover rounded-md"
            height={10}
            loading="eager"
          />
        </div>
        <div className="flex items-center justify-center border border-grayish-blue w-25 h-12 rounded-xl ">
          <Image
            src={iconCreditCard}
            alt="img-credit-card"
            width={10}
            className="image-credit-card h-12 w-12 object-cover rounded-md"
            height={10}
            loading="eager"
          />
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmitInfoPayment} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name-on-card" className="block text-sm font-medium text-dark-grayish-blue">
            Name on Card:
          </label>
          <input
            id="name-on-card"
            type="text"
            placeholder="John Doe"
            required
            className=" border-b w-full py-2 px-3 text-grayish-blue focus:outline-none focus:border-b-2 focus:border-orange "
          />
        </div>

        <div>
          <label htmlFor="card-number" className="block text-sm font-medium text-dark-grayish-blue">
            Card Number:
          </label>
          <input
            id="card-number"
            type="text"
            placeholder="0000 0000 0000 0000"
            required
            className=" border-b w-full py-2 px-3 text-grayish-blue focus:outline-none focus:border-b-2 focus:border-orange "
          />
        </div>
        <div>
          <label htmlFor="card-number" className="block text-sm font-medium text-dark-grayish-blue">
            cvv:
          </label>
          <input
            id="cvv-number"
            type="text"
            placeholder="000 or 0000"
            required
            className=" border-b w-full py-2 px-3 text-grayish-blue focus:outline-none focus:border-b-2 focus:border-orange "
          />
        </div>

        <label htmlFor="expiration-date" className="block text-sm font-medium text-dark-grayish-blue">
          Expiration Date:
        </label>
        <div className="flex gap-3">

          <div className="flex gap-4 w-full">
            {/* SELECTOR DE MESES (sin cambios importantes) */}
            <select
              id="month"
              className="w-full py-2 border-b-2 border-grayish-blue text-dark-grayish-blue 
               focus:border-orange focus:outline-none transition-colors duration-200 
               hover:border-orange appearance-none bg-transparent cursor-pointer"
            >
              <option value="" disabled className="">Month</option>
              {/* Generación de meses usando map para ser más conciso */}
              {[...Array(12)].map((_, index) => {
                const month = index + 1;
                // Formatea el mes a dos dígitos (ej: 1 -> "01")
                const value = month.toString().padStart(2, '0');
                const monthNames = [
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ];
                return (
                  <option key={value} value={value} className=" w-15 text-grayish-blue text-[.8rem]">
                    {monthNames[index]}
                  </option>
                );
              })}
            </select>

            {/* SELECTOR DE AÑOS */}
            <select
              id="year"
              className="w-full py-2 border-b-2 border-grayish-blue text-dark-grayish-blue 
               focus:border-orange focus:outline-none transition-colors duration-200 
               hover:border-orange appearance-none bg-transparent cursor-pointer"
            >
              <option value="" disabled>Year</option>
              {YEAR_OPTIONS}
            </select>
          </div>

        </div>
      
          <button
            className="bg-orange text-very-dark-blue font-bold rounded p-2 w-full mt-4 hover:bg-orange-600 transition"
            type="submit"
          >
            Checkout
          </button>

      </form>
    </div>
  );
};
export default CardInfoPayment