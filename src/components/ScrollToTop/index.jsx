import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pointer-events-none fixed bottom-7 left-1/2 -translate-x-1/2 transform">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto flex items-center rounded-full bg-gradient-to-t from-blue-500 to-blue-700 p-2 text-white shadow-lg hover:to-blue-900 hover:font-semibold focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-75"
        >
          <FaArrowUp className="mr-2 h-6 w-6" />
          <span>Back to Top</span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
