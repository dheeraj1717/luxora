import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard.jsx'
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/Cart.js";

function ProductCard({ data }) {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const product_name = data?.productName;
  const imageUrl = data.image
  // console.log("productcarddata:",data?.images?.[0])
  // const product_name = d.replace(/\s+/g, "-");
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    dispatch(addToCart(data))
  }
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

        <Link to={`/products/${data._id}`}>
          <img
            src={imageUrl}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="">
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
            {/* {data.shop.name} */}
          </h5>
        </Link>
        <Link to>
          <h4 className="pb-3 font-[500]">
            { product_name}
          </h4>
          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discountedPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.price ? data.price + "$" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.totalSell} sold
            </span>
          </div>
        </Link>
        {/* side options for cart wishlist.... */}
        <div>
          {/* {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from Wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Add to Wishlist"
            />
          )} */}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick View"
          />

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data)}
            color="#444"
            title="Add to Cart"
          /> 
          {
            open?(
                <ProductDetailsCard setOpen={setOpen} data={data}/>
            ):null
          }
        </div>
      </div>
    </>
  );
}

export default ProductCard;
