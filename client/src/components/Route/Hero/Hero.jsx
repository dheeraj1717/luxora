import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat flex items-center"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="mx-auto w-[90%] 800px:w-[60%]">
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best Collection for <br /> Home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet nihil
          doloremque nobis excepturi ex. Commodi labore repellat temporibus sed.
          Ipsum! <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
        <Link to="/products">
          {" "}
          <div className={`${styles.button}`}>
            <span className="text-white font-Poppins text-[18px]">ShopNow</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
