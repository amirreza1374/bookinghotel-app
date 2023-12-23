import {
  MapPinIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MinusSmallIcon,
  PlusSmallIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const navigate = useNavigate();
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      data: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className="flex flex-col items-center justify-center px-2  w-full mt-2 ">
      <div className="flex font-ubuntu px-3  items-center justify-between text-base max-w-[1440px] rounded-2xl md:text-lg container border-2 text-indigo-800 border-orange-500 md:px-8 py-6">
        <User />
        &#124;
        <div
          className="cursor-pointer hidden md:block"
          onClick={() => navigate("/")}
        >
          Home
        </div>
        <div
          className="cursor-pointer md:hidden  flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <div className="">
            <HomeIcon className="w-5 h-5 " />
          </div>
        </div>
        &#124;
        <NavLink className="hidden md:block" to="bookmark">
          Bookmarks
        </NavLink>
        <NavLink className="md:hidden" to="bookmark">
          <BookmarkIcon className="w-5 h-5" />
        </NavLink>
        &#124; 
        <div className=" items-center justify-center hidden md:flex">
          <MapPinIcon className="w-6 h-6 mr-2 text-orange-600" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            name="destination"
            id="destination"
            placeholder="where to go?"
            className="text-base border-none"
          />
        </div>
        <div className="hidden md:block">&#124;</div>
        <div
          onClick={() => setOpenDate(!openDate)}
          className="flex items-center justify-center"
        >
          <CalendarDaysIcon className="w-6 h-6 mr-2 text-orange-600" />

          <div className="hidden lg:block text-[13px] xl:text-lg">
            {`from ${format(date[0].startDate, "MM/dd/yyyy")}  to   ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className="absolute top-20 left-4 md:left-auto"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        &#124;
        <div className="">
          <div
            id="optionDropDown"
            className="relative text-sm lg:hidden"
            onClick={() => setOpenOptions(!openOptions)}
          >
            choose options
          </div>
          <div
            id="optionDropDown"
            className="lg:block text-[13px] xl:text-lg hidden"
            onClick={() => setOpenOptions(!openOptions)}
          >
            {options.adult} adult &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{" "}
            {options.children} children&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptions
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          )}
        </div>
        &#124;
        <div className="bg-indigo-800  rounded-2xl">
          <button className="flex" onClick={handleSearch}>
            <MagnifyingGlassIcon className="lg:w-6 lg:h-6 w-4 h-4 mx-1 xl:mx-3 my-1 text-white" />
          </button>
        </div>
      </div>

      <div className="flex w-full  mt-4 md:hidden">
        <MapPinIcon className="w-6 h-6 mr-2 text-orange-600" />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type="text"
          name="destination"
          id="destination"
          placeholder="where to go?"
          className="[all:unset]"
        />
      </div>
    </div>
  );
}

function GuestOptions({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div
      ref={optionsRef}
      className="absolute top-50 right-16 bg-indigo-800 text-white rounded-lg px-3"
    >
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ options, minLimit, type, handleOptions }) {
  return (
    <div className=" flex items-center justify-between my-2">
      <span className="text-orange-500 mr-14">{type}</span>
      <div className="flex items-center">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="border border-white rounded-lg p-1"
          disabled={options[type] <= minLimit}
        >
          <MinusSmallIcon className="h-5 w-5" />
        </button>
        <span className="text-lg mx-3">{options[type]}</span>

        <button
          onClick={() => handleOptions(type, "inc")}
          className="border  border-white rounded-lg p-1"
        >
          <PlusSmallIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="">
        {isAuthenticated ? (
          <div className=" items-center md:flex">
            <span className="hidden md:block">{user.name}</span>
            <button className="flex">
              <ArrowLeftOnRectangleIcon
                onClick={handleLogout}
                className="w-5 h-5 cursor-pointer text-orange-500"
              />
            </button>
          </div>
        ) : (
          <NavLink className="cursor-pointer flex items-center" to="/login">
            <span className=" hidden md:block">Login</span>
            <ArrowRightOnRectangleIcon className="w-5 h-5 md:hidden text-orange-500" />
          </NavLink>
        )}
      </div>
    </>
  );
}
