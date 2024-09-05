import React from "react";

const Spinner = () => {
  return (
    <div className="mt-20 flex justify-center">
      <div className="inline-block h-24 w-24 animate-spin rounded-full border-8 border-solid border-violet-700 border-e-transparent dark:border-white"></div>
    </div>
  );
};

export default Spinner;
