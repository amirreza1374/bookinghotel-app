import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../context/HotelProvider";

function AppLayout() {
  const { hotelsData } = useHotels();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-4 max-w-[1440px] mx-auto font-ubuntu">
     <Map markerLocations={hotelsData} /> <div className="w-full">
        <Outlet />
      </div>
      <div className="">
      
      </div>
    </div>
  );
}

export default AppLayout;
