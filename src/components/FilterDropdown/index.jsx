import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";

const FilterDropdown = ({ filter, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (value) => {
    setFilter(value);
    setIsOpen(false);
  };

  const options = [
    { value: "newest", label: "Sort by Newest" },
    { value: "oldest", label: "Sort by Oldest" },
    { value: "price-low-high", label: "Sort by Price: Low to High" },
    { value: "price-high-low", label: "Sort by Price: High to Low" },
    { value: "highest-rated", label: "Top Rated" },
    { value: "pets-allowed", label: "Pet Friendly", icon: <MdOutlinePets /> },
  ];

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <button
          onClick={toggleDropdown}
          className="flex items-center rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700"
        >
          Filter
          {!isOpen ? (
            <IoIosArrowDown className="ml-3" />
          ) : (
            <IoIosArrowUp className="ml-3" />
          )}
        </button>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-1 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg md:left-1"
        >
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className={`flex cursor-pointer items-center px-4 py-2 ${option.disabled ? "cursor-not-allowed text-gray-400" : "hover:bg-gradient-to-t hover:from-orange-300 hover:to-orange-400"}`}
                onClick={() =>
                  !option.disabled && handleOptionClick(option.value)
                }
              >
                {option.icon} {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
