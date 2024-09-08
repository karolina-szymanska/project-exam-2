import { BASE_URL } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import home1 from "../../assets/home1.jpg";
import home2 from "../../assets/home2.jpg";
import home3 from "../../assets/home3.jpg";
import home4 from "../../assets/home4.jpg";
import { BiSearch } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiHome2Line } from "react-icons/ri";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import RecentlyAddedVenues from "../../components/RecentlyAddedVenues";

const HomePage = () => {
  const { data, loading, error } = useFetch(BASE_URL + "/venues");

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="relative">
        <img
          src={home1}
          alt="several boats in the water, along some colorful buildings in sunset"
          style={{
            width: "100%",
            height: "300px",
            filter: "brightness(60%)",
          }}
          className="object-cover md:mt-6 md:rounded-xl"
        />

        <div className="absolute bottom-0 left-10 top-2 flex w-44 flex-col items-center justify-center uppercase">
          <h2 className="text-2xl font-bold text-white">
            Discover new amazing places to visit
          </h2>

          <button className="mt-8 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-6 py-2 font-semibold uppercase hover:to-orange-500">
            <Link to="/listings">
              <div className="flex items-center gap-2">
                <BiSearch size={24} /> Search
              </div>
            </Link>
          </button>
        </div>
      </div>

      <div className="mx-auto ms-5 overflow-x-auto md:ms-0 md:items-center">
        <RecentlyAddedVenues />
      </div>

      <div className="my-12 ml-8 flex overflow-auto md:ml-0 lg:ml-0">
        <div className="flex justify-evenly rounded-lg bg-blue-700 p-5 text-white">
          <p className="m-2 mt-5 w-72 p-1 text-xl font-semibold md:w-1/4">
            Find and book your perfect stay
          </p>
          <div className="m-3 mx-6 flex w-1/3 flex-col items-center rounded-3xl border p-2 px-4 md:w-1/4">
            <Link to="/listings">
              <p>Search for your new favorite place</p>
              <div className="mt-2 flex items-center justify-center">
                <BiSearch size={36} />
              </div>
            </Link>
          </div>
          <div className="m-3 mx-6 flex w-1/3 flex-col items-center justify-center rounded-3xl border p-2 px-4 md:w-1/4">
            <Link to="/login">
              <p>Sign in or register to book your venue now</p>
              <div className="mt-2 flex items-center justify-center">
                <RiHome2Line size={36} />
              </div>
            </Link>
          </div>

          <div className="m-3 mx-6 flex w-1/3 flex-col items-center rounded-3xl border p-2 px-4 md:w-1/4">
            <Link to="/listings">
              <p>Explore available dates on venues</p>
              <div className="mt-2 flex items-center justify-center">
                <IoCalendarNumberOutline size={36} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="m-6 grid grid-cols-1 gap-4 md:grid-cols-4 lg:m-0">
        <div className="col-span-1 row-span-1 rounded-xl md:col-span-3 md:row-span-2">
          <div className="card rounded-xl border">
            <img
              src={home2}
              alt="Maldives white sand beach from a bird`s eye view"
              className="card-img-top h-56 w-full rounded-xl object-cover md:h-96"
            />
            <div className="card-body p-2">
              <Link to="/listings">
                <h5 className="card-title font-semibold">
                  Explore Exciting New Destinations
                </h5>
                <h6 className="card-subtitle text-muted mb-2">
                  Check out our latest places
                </h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl md:col-span-1">
          <div className="card rounded-xl border bg-white">
            <img
              src={home3}
              alt="a person pointing at a camera, nearby macbook"
              className="card-img-top h-56 w-full rounded-xl object-cover md:h-32"
            />
            <div className="card-body p-2">
              <Link to="/listings">
                <h5 className="card-title font-semibold">
                  Book your next trip now
                </h5>
                <h6 className="card-subtitle text-muted mb-2">
                  Find your holiday
                </h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-1 rounded-xl md:col-span-1">
          <div className="card rounded-xl border md:mt-2 lg:mt-7">
            <img
              src={home4}
              alt="a person in a straw hat lying on sand"
              className="card-img-top h-56 w-full rounded-xl object-cover md:h-40"
            />
            <div className="card-body p-2">
              <Link to="/about">
                <h5 className="card-title mb-2 font-semibold">Travel Tips</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-700 py-8 md:my-12 md:rounded-xl">
        <p className="text-center text-lg font-semibold uppercase text-white md:text-xl">
          Subscribe our newsletter
        </p>
        <form action="">
          <div className="md:text-md mt-3 justify-center text-center text-sm">
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="font-sm md:font-md rounded-full border p-4 py-2 md:mt-4 md:px-14 md:pl-6"
            />
            <button className="md:text-md rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-sm font-semibold uppercase hover:to-orange-500 md:mb-5 md:ms-4">
              subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
