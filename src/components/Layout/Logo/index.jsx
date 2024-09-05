import React from "react";
import { Link } from "react-router-dom";
import { GiPalmTree } from "react-icons/gi";

const Logo = ({ colorClass }) => {
  return (
    <div className={colorClass || "text-violet-700"}>
      {" "}
      <Link to="/" className="flex items-center">
        <GiPalmTree size={40} />
        <h1 className="mt-2 text-2xl">Holidaze</h1>
      </Link>
    </div>
  );
};

export default Logo;
