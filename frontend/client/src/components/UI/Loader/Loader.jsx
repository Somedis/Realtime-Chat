import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import cl from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={cl.loader}>
      <MoonLoader color="#f68657" size={120}/>
    </div>
  )
};

export default Loader;