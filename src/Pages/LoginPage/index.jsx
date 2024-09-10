import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Layout/Logo";
import { loginUser } from "../../components/API/Auth/Login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCloseIcon = () => {
    navigate("/");
  };

  const handleClearEmail = () => {
    setEmail("");
  };

  const handleClearPassword = () => {
    setPassword("");
  };

  const onLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);
      navigate("/profile");
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("userEmail", data.data.email);
      localStorage.setItem("username", data.data.name);
    } catch (error) {
      console.error("Error:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mx-auto mb-16 mt-8 flex max-w-sm flex-col px-6">
      <div className="mb-2 flex justify-end">
        <button>
          <IoClose size={30} onClick={handleCloseIcon} />
        </button>
      </div>
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>
      <div className="mb-6">
        <h1 className="py-2 text-lg font-semibold">Sign in to your account</h1>
        <p>
          Easily keep track of prices and plan your travels, or switch gears to
          become a Venue Manager and rent out your spaces hassle-free.
        </p>
      </div>
      <form onSubmit={onLoginFormSubmit}>
        <div>
          <div>
            <div className="relative mb-6 flex items-center text-lg">
              <MdOutlineEmail className="absolute ml-3" size={24} />
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-xl border py-2 pl-12 leading-tight focus:border-blue-700 focus:bg-white focus:outline-none"
              />
              <IoClose
                size={30}
                onClick={handleClearEmail}
                className="absolute right-3 cursor-pointer text-gray-800"
              />
            </div>
            <div className="relative mb-6 flex items-center text-lg">
              <FaLock className="absolute ml-3" size={24} />
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border py-2 pl-12 focus:border-blue-700 focus:bg-white focus:outline-none"
              />
              <IoClose
                size={30}
                onClick={handleClearPassword}
                className="absolute right-3 cursor-pointer text-gray-800"
              />
            </div>
          </div>
          {error && <p className="mb-2 text-red-700">{error}</p>}

          <button className="mb-2 w-full rounded-full bg-gradient-to-t from-orange-300 to-orange-400 p-2 font-medium uppercase text-black hover:to-orange-500 hover:font-bold">
            Login
          </button>
        </div>
        <p className="text-md mt-2 text-center">
          Don't have an account yet?{" "}
          <Link to={"/register"} className="text-blue-700 underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
