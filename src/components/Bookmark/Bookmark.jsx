import React from "react";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length)
    return (
      <p className="mt-10 text-2xl text-red-500">
        ❗There is no Bookmark Location.
      </p>
    );

  return (
    <div className="font-ubuntu mt-7 text-indigo-800 font-bold md:ml-8">
      <h2 className="text-2xl">Bookmark list:</h2>

      <div className="">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`border-4 flex items-center justify-between rounded-xl p-4 my-4  ${
                  item.id === currentBookmark?.id
                    ? "border-2 border-indigo-800 rounded-xl"
                    : ""
                }`}
              >
                <div className="">
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;&nbsp;<strong>{item.cityName}</strong>
                  &nbsp;&nbsp;-&nbsp;&nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)} className="t">
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
