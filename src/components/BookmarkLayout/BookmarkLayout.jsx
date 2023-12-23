import React from "react";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-4 max-w-[1440px] mx-auto font-ubuntu">
     <Map markerLocations={bookmarks} /> <div className="">
        <Outlet />
      </div>
      
    </div>
  );
}

export default BookmarkLayout;
