import useFetch from "../../hooks/useFetch";
import {
  MapPinIcon,
  SparklesIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import Loader from "../Loader/Loader";

function LocationList() {
  const { data, isLoading } = useFetch(
    "https://bookinghotel-backend.liara.run/hotels",
    ""
  );

  if (isLoading) return <Loader />;

  return (
    <div className="container max-w-[1440px] mx-auto px-2 font-ubuntu text-indigo-800">
      <h2 className="mx-2 text-base md:text-3xl font-bold my-3">
        Nearby Locations:
      </h2>
      <div className="mx-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
          {data.map((item) => {
            return (
              <div className="" key={item.id}>
                <img
                  className="w-full max-h-[198px] sm:max-w-[420px] sm:max-h-[149px] rounded-lg"
                  src={item.picture_url.url}
                  alt={item.name}
                />

                <div className="">
                  <p className="flex items-center gap-x-1 mt-2">
                    <MapPinIcon className="text-orange-500 w-6 h-6" />
                    {item.smart_location}
                  </p>
                  <p className="flex  gap-x-1 mt-2">
                    <SparklesIcon className="text-orange-500 w-6 h-6" />
                    {item.name}
                  </p>
                  <p className="flex items-center gap-x-1 mt-2">
                    <CurrencyEuroIcon className="text-orange-500 w-6 h-6" />
                    &#8364;&nbsp;
                    {item.price}&nbsp;Per Night
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LocationList;
