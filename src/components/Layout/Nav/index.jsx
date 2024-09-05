import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

export function isLoggedIn() {
  const userToken = localStorage.getItem("accessToken");
  return !!userToken;
}

const NavLinks = ({ isOpen, closeMenu }) => {
  const { pathname } = useLocation();
  const isActiveNavLink = (path) => {
    return pathname === path ? "text-violet-700 font-bold" : "text-black";
  };

  return (
    <>
      {isOpen && isLoggedIn() && (
        <NavLink
          to="/profile"
          className={`mb-2 p-2 text-xl uppercase hover:bg-violet-700 hover:text-white md:px-4 md:text-lg md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/profile")}`}
          onClick={closeMenu}
        >
          Profile
        </NavLink>
      )}
      <NavLink
        to="/"
        className={`mb-2 p-2 text-xl uppercase hover:bg-violet-700 hover:text-white md:px-4 md:text-lg md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/")}`}
        exact="true"
        onClick={closeMenu}
      >
        Home
      </NavLink>

      <NavLink
        to="/listings"
        className={`mb-2 p-2 text-xl uppercase hover:bg-violet-700 hover:text-white md:px-4 md:text-lg md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/listings")}`}
        onClick={closeMenu}
      >
        Venues
      </NavLink>

      <NavLink
        to="/about"
        className={`p-2 text-xl uppercase hover:bg-violet-700 hover:text-white md:px-4 md:text-lg md:hover:bg-zinc-50 md:hover:font-bold md:hover:text-violet-700 ${isActiveNavLink("/about")}`}
        onClick={closeMenu}
      >
        About
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <nav className="flex justify-end">
        <div className="mt-2 hidden w-full justify-between md:flex">
          <NavLinks isOpen={true} />
        </div>

        <div className="ms-4 flex items-center space-x-2">
          {isLoggedIn() ? (
            <button
              onClick={handleLogout}
              className="mr-3 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 font-semibold uppercase hover:from-red-500 hover:to-red-700 hover:text-white md:mr-0"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="mr-3 rounded-full bg-gradient-to-t from-violet-500 to-violet-700 px-6 py-2 font-semibold uppercase text-white hover:to-violet-900 hover:font-bold md:mr-0"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </div>
        <div className="flex py-2 md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <IoClose size={30} /> : <HiOutlineMenu size={30} />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="mt-4 flex basis-full flex-col md:hidden">
          <NavLinks isOpen={isOpen} closeMenu={closeMenu} />
        </div>
      )}
    </>
  );
};

export default Nav;
