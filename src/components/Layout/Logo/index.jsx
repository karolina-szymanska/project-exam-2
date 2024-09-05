import React from "react";
import { Link } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";

const Logo = ({ colorClass }) => {
  return (
    <div className={colorClass || "text-violet-700"}>
      {" "}
      <Link to="/" className="flex items-center">
        <RiHome2Line size={40} />
        <h1 className="mt-2 text-2xl">Holidaze</h1>
      </Link>
    </div>
  );
};

export default Logo;
