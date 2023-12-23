import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelProvider";

function SingleHotel() {
  const { id } = useParams();
  //   const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  const navigate = useNavigate();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;
  return (
    <div className="lg:ml-8 mt-2">
      <div className="w-2/3 mt-8 pr-7 text-indigo-800">
        <img
          className="w-full h-[250px] rounded-lg mb-4"
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
        />
        <h1 className="text-xl">{currentHotel.name}</h1>
        <div className="">
          {currentHotel.number_of_reviews} reviews &nbsp;-&nbsp;{" "}
          {currentHotel.smart_location}
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="border bg-orange-500 py-2 mt-3 text-white rounded-lg px-8"
      >
        Back
      </button>
    </div>
  );
}

export default SingleHotel;
