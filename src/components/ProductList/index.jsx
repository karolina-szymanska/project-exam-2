import React, { useEffect, useState } from "react";
import { BASE_URL } from "../API";
import Spinner from "../Spinner";
import { IoCloseOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../Card";
import FilterDropdown from "../FilterDropdown";

function ProductList() {
  const [pageCounter, setPageCounter] = useState(1);
  const [productsPerPage] = useState(48);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      let allDataTemp = [];
      let currentPage = 1;
      let totalPageCount = 1;

      while (currentPage <= totalPageCount) {
        try {
          let sortField = "created";
          let sortOrder = "desc";

          switch (filter) {
            case "oldest":
              sortField = "created";
              sortOrder = "asc";
              break;
            case "price-low-high":
              sortField = "price";
              sortOrder = "asc";
              break;
            case "price-high-low":
              sortField = "price";
              sortOrder = "desc";
              break;
            case "highest-rated":
              sortField = "rating";
              sortOrder = "desc";
              break;
            default:
              sortField = "created";
              sortOrder = "desc";
          }

          const response = await fetch(
            `${BASE_URL}/venues?sort=${sortField}&sortOrder=${sortOrder}&limit=${productsPerPage}&page=${currentPage}`,
          );
          const newData = await response.json();

          if (currentPage === 1) {
            totalPageCount = newData.meta.pageCount;
          }

          allDataTemp = [...allDataTemp, ...newData.data];
          currentPage += 1;
        } catch (err) {
          setError(err);
          break;
        }
      }

      setAllData(allDataTemp);
      setLoading(false);
    };

    fetchAllData();
  }, [filter, productsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageCounter]);

  const getSortedData = (data) => {
    let sortedData = [...data];
    switch (filter) {
      case "oldest":
        sortedData.sort((a, b) => new Date(a.created) - new Date(b.created));
        break;
      case "price-low-high":
        sortedData.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedData.sort((a, b) => b.price - a.price);
        break;
      case "highest-rated":
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedData.sort((a, b) => new Date(b.created) - new Date(a.created));
    }
    return sortedData;
  };

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const filteredData = allData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPetsFilter =
      filter === "pets-allowed" ? product.meta.pets : true;
    return matchesSearch && matchesPetsFilter;
  });

  const sortedFilteredProducts = getSortedData(filteredData);

  const handleClearInput = () => {
    setSearchTerm("");
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      sortedFilteredProducts.length / productsPerPage,
    );
    if (pageCounter < totalPages) {
      setPageCounter((prevCounter) => prevCounter + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageCounter > 1) {
      setPageCounter((prevCounter) => prevCounter - 1);
    }
  };

  const indexOfLastProduct = pageCounter * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(sortedFilteredProducts.length / productsPerPage);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-6 flex w-full max-w-[990px] flex-col items-center bg-violet-700 px-2 py-6 md:my-6 md:mt-10 md:rounded-xl">
        <h1 className="mb-4 text-2xl font-medium capitalize text-white md:text-3xl">
          Find new Venue
        </h1>
        <div className="flex w-full items-center justify-center gap-1 md:gap-4">
          <div className="relative flex w-full max-w-[600px] items-center rounded-xl bg-white shadow-md">
            <BiSearch
              size={24}
              className="absolute left-3 top-0 ml-2 mt-2 text-gray-800"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border-0 py-2 pl-12 pr-16 focus:outline-none"
            />
            <IoCloseOutline
              size={30}
              onClick={handleClearInput}
              className="absolute right-0 top-0 mr-3 mt-2 cursor-pointer text-gray-800"
            />
          </div>
          <div className="relative flex items-center">
            <FilterDropdown filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>
      <div className="mb-4 ms-2 w-full max-w-[990px] text-start">
        <p className="text-lg font-medium">
          {sortedFilteredProducts.length} products found
        </p>
      </div>
      <div className="flex w-full max-w-[990px] flex-wrap justify-center">
        <ProductCard venues={currentProducts} />
      </div>

      <div className="my-10 flex items-center justify-center gap-4">
        <button
          onClick={handlePreviousPage}
          className={`w-24 rounded-full p-2 py-2 ${
            pageCounter === 1
              ? "cursor-not-allowed border border-zinc-300 opacity-50"
              : "bg-violet-700 text-white"
          }`}
          disabled={pageCounter === 1}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {pageCounter} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className={`w-24 rounded-full p-2 py-2 ${
            pageCounter === totalPages
              ? "cursor-not-allowed border border-zinc-300 opacity-50"
              : "bg-violet-700 text-white hover:bg-violet-800"
          }`}
          disabled={pageCounter === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
