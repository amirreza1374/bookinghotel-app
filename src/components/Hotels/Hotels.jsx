import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import {
  CurrencyEuroIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useHotels } from "../context/HotelProvider";

function Hotels() {
  const { isLoading, hotelsData, currentHotel } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="w-full text-indigo-800">
      <div className="max-w-[1550px] lg:ml-8 mt-7 ">
        <h2 className="my-5 ">Search Results({hotelsData.length}):</h2>
        {hotelsData.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`flex items-end  mb-4 gap-x-4 ${
                  item.id === currentHotel?.id
                    ? "border-2 border-indigo-800 rounded-lg"
                    : ""
                }`}
              >
                <img
                  className="w-1/2 min-w-[144px] md:max-w-[167px] max-h-[96px] md:max-h-[94px] rounded-lg"
                  src={item.picture_url.url}
                  alt={item.name}
                />
                <div className="text-[10px] sm:text-[13px] lg:text-[16px] w-full">
                  <p className="flex  gap-x-1 ">
                    <MapPinIcon className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                    {item.smart_location}
                  </p>
                  <p className="flex  gap-x-1 ">
                    {" "}
                    <SparklesIcon className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                    {item.name}
                  </p>
                  <p className="flex  gap-x-1 ">
                    <CurrencyEuroIcon className="text-orange-500 w-5 h-5 md:w-6 md:h-6" />
                    &#8364;&nbsp;
                    {item.price}&nbsp;Per Night
                  </p>
                  
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
