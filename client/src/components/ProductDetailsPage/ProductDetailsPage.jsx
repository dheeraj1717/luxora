import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { server } from '../../server';
import { useParams } from 'react-router-dom';
import {
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from '../../styles/styles';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../redux/actions/Cart';
import { toast } from "react-toastify";

function ProductDetailsPage() {
    const [data, setData] = useState(null);
    const [count, setCount] = useState(1);
    const { id } = useParams();
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`${server}/product/products`);
            const result = await response.json();
            console.log(result);

            if (response.ok) {
                const searchedProduct = result.products.find(product => product._id === id);
                console.log(searchedProduct)
                setData(searchedProduct);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error("There was an error fetching the products:", error);
        }
    };
    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: count };
                dispatch(addToCart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="bg-white">
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img
                                    src={`${data.image}`}
                                    alt={data.productName}
                                    className="w-[80%]"
                                />
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1 className={`${styles.productTitle}`}>{data.productName}</h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        ${data.discountedPrice}
                                    </h4>
                                    <h3 className={`${styles.price}`}>
                                        {data.price ? `$${data.price}` : null}
                                    </h3>
                                </div>

                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={decrementCount}
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                            {count}
                                        </span>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={incrementCount}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                                    onClick={() => addToCartHandler(data._id)}
                                >
                                    <span className="text-white flex items-center">
                                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetailsPage;
