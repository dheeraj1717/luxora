import React, { useEffect, useState } from "react";
import image from "../../assets/images/luxora.png";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import DropDown from "./Dropdown.jsx";
import styles from "../../styles/styles";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart.jsx";
import WishList from "../WishList/WishList.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = term
      ? productData &&
        productData.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      : null;
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const { user } = useSelector((state) => state.user);
  const {cart} = useSelector((state)=>state.cart)
// Calculate the total number of items in the cart
const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const handleAddProductClick = () => {
    if (user?.role === "admin") {
      window.location.href = "/addProduct"; // Or use a navigation method from react-router-dom
    } else {
      toast.error("You do not have permission to add products.");
    }
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden lg:h-[50px] lg:my-[20px] lg:flex items-center justify-between">
          <div>
            <Link to="/">
              <img className="h-10 w-20" src={image} alt="" />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/product/${product_name}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`} onClick={handleAddProductClick}>
            <h1 className="text-[#fff] flex items-center cursor-pointer">
              Add Product
              <IoIosArrowForward className="ml-1" />
            </h1>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden lg:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`w-[90%] mx-auto relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropdown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
              />
              {dropdown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* navitems */}
          <div className="flex items-center ">
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            {/* <div className="flex items-center" onClick={() => setOpenWishlist(true)}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255/83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                  0
                </span>
              </div>
            </div> */}
            <div className="flex items-center" onClick={() => setOpenCart(true)}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255/83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center ">
                  {cart.length}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative cursor-pointer mr-[15px]">
                <Link to="/login">
                  <CgProfile size={30} color="rgb(255 255 255/83%)" />
                </Link>
              </div>
            </div>
            {/* cart popup */}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {/* wishlist popup */}
            {openWishlist && <WishList setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
