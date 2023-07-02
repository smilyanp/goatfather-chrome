import React from "react";
import Loader from "../../components/Loader";

const Loading = () => (
  <div className="flex w-72 h-96">
    <div className="flex flex-col justify-center flex-1 p-4">
      <Loader />
    </div>
  </div>
);
export default Loading;
