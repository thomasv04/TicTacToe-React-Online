import React from "react";
import ReactLoading from "react-loading";

import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <ReactLoading type={"cylon"} color="#3A98D4" height='auto' width={"20%"} />
    </div>
  );
};

export default Loader;
