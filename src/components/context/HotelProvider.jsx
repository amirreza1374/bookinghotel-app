import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import toast from "react-hot-toast";
import axios from "axios";

const HotelContext = createContext();
const BASE_URL = "https://bookinghotel-backend.liara.run/hotels";

export default function HotelProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotelsData } = useFetch(
    BASE_URL,
    `name_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotelsData,
        
        currentHotel,
        getHotel,
        isLoadingCurrHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
