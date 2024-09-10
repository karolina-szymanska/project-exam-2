import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <section className="flex items-center bg-gray-50 p-16 md:h-screen dark:bg-gray-700">
        <div className="container flex flex-col items-center">
          <div className="flex max-w-md flex-col gap-6 text-center">
            <h2 className="text-8xl font-extrabold text-gray-600 dark:text-gray-100">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl dark:text-gray-300">
              Sorry, we couldn't find this page.
            </p>
            <Link
              to="/"
              className="rounded-full bg-blue-700 px-8 py-2 text-lg font-semibold text-gray-50 hover:text-gray-200"
            >
              {" "}
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
