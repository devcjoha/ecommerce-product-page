
import iconPlus from "@/public/icon-plus.svg";
import iconMinus from "@/public/icon-minus.svg";
import Image from "next/image";

type CounterProps = {
  stock: number;
  value: number;
  onChange?: (value: number) => void;
  
}

function Counter({ stock, value, onChange }: CounterProps) {

  const increment = () => {
    if (value < stock) {
      onChange?.(value + 1);
    }
  };
  const decrement = () => {
    if (value > 0) onChange?.(value - 1);
  };

  return (
    <div className="contador-container flex flex-row items-center lg:justify-evenly justify-between bg-light-grayish-blue rounded-md lg:w-35 w-full h-12 shadow-lg">
      <button onClick={decrement} className="button-decrement flex items-center justify-center cursor-pointer w-1/3 h-full" disabled={value === 0}>
        <Image
          src={iconMinus}
          alt="icon-minus"
          width={10}
          height={10}
          className="icon-minus w-3 h-1 "
        />
      </button>
      <span className="font-bold flex items-center justify-center w-1/3 h-1/3">{value}</span>
      <button onClick={increment} className="button-increment  flex items-center justify-center w-1/3 h-full cursor-pointer " disabled={value >= stock}>
        <Image
          src={iconPlus}
          alt="icon-plus"
          width={10}
          height={10}
          className="icon-plus w-3 h-3"
        />
      </button>

    </div>
  )
};
export default Counter;