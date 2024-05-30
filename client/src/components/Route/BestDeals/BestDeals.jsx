import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import { server } from '../../../server.js';

function BestDeals() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(`${server}/product/products`);
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setData(result.products);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("There was an error fetching the products:", error);
    }
  };

  return (
    <div>
      <div className="w-[90%] mx-auto">
        <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {
            data && data.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
