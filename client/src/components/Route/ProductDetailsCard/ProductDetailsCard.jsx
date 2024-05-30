import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineMessage,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  
} from "react-icons/ai";


function ProductDetailsCard({ setOpen, data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);
  const handleMessageSubmit = () => {};
  const decrementCount = () =>{
    if(count>1){
      setCount(count-1);
    }
  }
  const incrementCount = () =>{
setCount(count+1);
  }
  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="relative w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="absolute w-full block 800px:flex gap-5 top-4 p-4">
              <div className="w-full 800px:w-[50%] h-[250px] 800px:h-[400px]">
                <img src={data.image} alt="" className=" h-full object-cover" />
               
               
                <h5 className="text-[16px] text-[red] mt-5 ">
                  ({data.totalSell}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] pt-10 ">
                <h1 className={`${styles.productName} text-[20px]`}>
                  {data.productName}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3 ">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}>
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px]">{count}</span>
                    <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}>
                      +
                    </button>
                  </div>
                  <div>
                  {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer "
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from Wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer "
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to Wishlist"
            />
          )}
          
                  </div>
                </div>
                <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}>
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1"/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetailsCard;
