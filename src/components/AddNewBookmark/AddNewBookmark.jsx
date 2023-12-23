import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContext";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();

  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "this location is not a city, please click on somewhere else."
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError)
    return <p className="mt-10 text-xl text-red-500">❗{geoCodingError}</p>;

  return (
    <div className="mt-8 font-ubuntu md:ml-8 text-indigo-800">
      <h2 className="text-3xl">Bookmark New Location</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-col mr-4">
          <label className="text-xl mb-1 mt-4" htmlFor="cityName">
            City Name:
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="border-2 border-indigo-400 rounded py-1 px-4"
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="flex flex-col mr-4 ">
          <label className="text-xl mb-1 mt-4" htmlFor="country">
            Country:
          </label>
          <div className="flex items-center justify-between w-full border-2 border-indigo-400 rounded py-1 px-4">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="[all:unset]"
              type="text"
              name="country"
              id="country"
            />
            <ReactCountryFlag svg countryCode={countryCode} />
          </div>
        </div>
        <div className="flex items-center justify-between mr-4 mt-8">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="border py-2 px-8 bg-orange-500 hover:bg-orange-400 text-white  border-orange-500 rounded-xl  "
          >
            Back
          </button>
          <button className="border py-2 px-8 bg-indigo-800 text-white hover:bg-indigo-600  rounded-xl  ">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
