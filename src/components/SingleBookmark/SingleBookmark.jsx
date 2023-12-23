import React, { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } = useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div className="text-indigo-800 mt-4 md:ml-8">
      <button
        onClick={() => navigate(-1)}
        className="border p-2 mt-4 border-orange-500 rounded-xl "
      >
        &larr; Back to Bookmark list
      </button>
      <h2 className="text-2xl mt-4 flex items-center">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;&nbsp;{currentBookmark.cityName}&nbsp;-&nbsp;
        {currentBookmark.country}
      </h2>
    </div>
  );
}

export default SingleBookmark;
