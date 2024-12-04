import React, { useEffect, useState } from "react";
import countriesData from "./countries.json";
import WeatherCard from "./WeatherCard";
import plane from "./assets/plane.png";
import { Result } from "postcss";

const App = () => {
  // States for origin
  const [originCountry, setOriginCountry] = useState("");
  const [originAirport, setOriginAirport] = useState("ABC");
  const [departureDate, setDepartureDate] = useState("");
  const [destinationCity, setDestinationCity] = useState("");

  // States for destination
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [flightTimings, setFlightTimings] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  // Find the selected country's data for origin and destination
  const originCountryData = countriesData.countries.find(
    (item) => item.code === originCountry
  );

  const destinationCountryData = countriesData.countries.find(
    (item) => item.code === destinationCountry
  );

  // Handlers
  const handleOriginCountryChange = (event) => {
    setOriginCountry(event.target.value);
    setOriginAirport("");
  };

  const handleOriginAirportChange = (event) => {
    setOriginAirport(event.target.value);
  };

  const handleDestinationCountryChange = (event) => {
    setDestinationCountry(event.target.value);
    setDestinationAirport("");
  };

  const handleDestinationAirportChange = (e) => {
    const selectedData = JSON.parse(e.target.value);
    setDestinationAirport(selectedData.code);
    setDestinationCity(selectedData.city);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (
        destinationAirport === "" ||
        originAirport === "" ||
        departureDate === "" ||
        destinationCity === ""
      )
        return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.aviationstack.com/v1/flightsFuture?iataCode=${originAirport}&type=arrival&date=${departureDate}&access_key=${import.meta.env.VITE_AVIATION_STACK_API_KEY}`
        );
        const responseData = await fetch(
          `http://api.weatherstack.com/current?access_key=${import.meta.env.VITE_WEATHER_STACK_API_KEY}&query=${destinationCity}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const resultData = await responseData.json();
        setWeatherData(resultData);
        setFlightTimings(
          result.data.slice(0, 3).map((item) => ({
            arrivalTime: item.arrival.scheduledTime,
            departureTime: item.departure.scheduledTime,
          }))
        );
        setArrivalTime(result.data[0].arrival.scheduledTime);
        setDepartureTime(result.data[0].departure.scheduledTime);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country data:", error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [originAirport, destinationAirport, departureDate, destinationCity]);

  function getTimeDifference(startTime, endTime) {
    // Split the time strings into hours and minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Convert both times to total minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Calculate the difference in minutes
    const differenceInMinutes = Math.abs(endTotalMinutes - startTotalMinutes);

    // Convert the difference back to hours and minutes
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    return `${hours} hours and ${minutes} minutes`;
  }
  return (
    <div className="min-h-screen flex bg-[#1A1A2E] text-gray-200 p-6">
      <div className="max-w-lg mx-auto min-w-[60%] rounded-lg p-6 bg-[#16213E] shadow-lg">
        <h1 className="mb-6 text-center text-[50px] font-teko text-yellow-400">
          Travel Planner
        </h1>

        {/* Origin Country and Airport */}
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-emerald-400">Select Origin</h2>
          <select
            value={originCountry}
            onChange={handleOriginCountryChange}
            className="w-full p-2 bg-[#1F4068] border border-yellow-500 rounded-md focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Select origin country</option>
            {countriesData.countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          {originCountry && originCountryData?.airports?.length > 0 && (
            <select
              value={originAirport}
              onChange={handleOriginAirportChange}
              className="w-full p-2 mt-2 bg-[#1F4068] border border-yellow-500 rounded-md"
            >
              <option value="">Select origin airport</option>
              {originCountryData.airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.code} - {airport.city}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Departure Date */}
        {originAirport && (
          <div className="mb-4">
            <label className="block mb-2 text-emerald-400">
              Departure Date:
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={handleDepartureDateChange}
              className="w-full p-2 bg-[#1F4068] border border-yellow-500 rounded-md"
            />
          </div>
        )}

        {/* Destination Country and Airport */}
        <div className="mb-4">
          <h2 className="text-lg mb-2 text-emerald-400">Select Destination</h2>
          <select
            value={destinationCountry}
            onChange={handleDestinationCountryChange}
            className="w-full p-2 bg-[#1F4068] border border-yellow-500 rounded-md"
          >
            <option value="">Select destination country</option>
            {countriesData.countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          {destinationCountry &&
            destinationCountryData?.airports?.length > 0 && (
              <select
                value={destinationAirport}
                onChange={handleDestinationAirportChange}
                className="w-full p-2 mt-2 bg-[#1F4068] border border-yellow-500 rounded-md"
              >
                <option value="">
                  {destinationAirport || "Select destination airport"}
                </option>
                {destinationCountryData.airports.map((airport) => (
                  <option
                    key={airport.code}
                    value={JSON.stringify({
                      code: airport.code,
                      city: airport.city,
                    })}
                  >
                    {airport.code} - {airport.city}
                  </option>
                ))}
              </select>
            )}
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400"></div>
          </div>
        ) : (
          originAirport &&
          destinationAirport && (
            <>
              <div className="flex items-center">
                <div className="text-[40px] text-yellow-400">
                  Available Flights
                </div>
                <img src={plane} className="w-[40px] ml-4" />
              </div>
              {flightTimings.map((time, index) => {
                const { arrivalTime, departureTime } = time;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 mt-10 text-gray-200"
                  >
                    <div className="flex flex-col text-center">
                      <div className="text-[25px] text-center text-yellow-400">
                        {originAirport} <br />
                      </div>
                      <span className="text-[12px] text-gray-300">
                        ({departureTime})
                      </span>
                    </div>

                    <div className="bg-yellow-400 h-[1px] w-full text-center">
                      {getTimeDifference(departureTime, arrivalTime)}
                    </div>

                    <div className="flex flex-col text-center">
                      <div className="text-[25px] text-center text-yellow-400">
                        {destinationAirport} <br />
                      </div>
                      <span className="text-[12px] text-gray-300">
                        ({arrivalTime})
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )
        )}
      </div>
      {!loading && Object.keys(weatherData).length > 0 && (
        <WeatherCard data={weatherData} />
      )}
    </div>
  );
};

export default App;

//   return (
//     <div className="min-h-screen flex bg-gray-100 p-6">
//       <div className="max-w-lg  mx-auto  min-w-[60%] rounded-lg p-6">
//         <h1 className=" mb-6 text-center text-[90px] font-teko">
//           Travel Planner
//         </h1>

//         {/* Origin Country and Airport Selection */}
//         <div className="mb-4">
//           <h2 className="text-lg font-medium mb-2">Select Origin</h2>
//           <select
//             value={originCountry}
//             onChange={handleOriginCountryChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select origin country</option>
//             {countriesData.countries.map((country) => (
//               <option key={country.code} value={country.code}>
//                 {country.name}
//               </option>
//             ))}
//           </select>

//           {originCountry && originCountryData?.airports?.length > 0 && (
//             <select
//               value={originAirport}
//               onChange={handleOriginAirportChange}
//               className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select origin airport</option>
//               {originCountryData.airports.map((airport) => (
//                 <option key={airport.code} value={airport.code}>
//                   {airport.code} - {airport.city}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* Departure Date Selector */}
//         {originAirport && (
//           <div className="mb-4">
//             <label className="block text-lg font-medium mb-2">
//               Departure Date:
//             </label>
//             <input
//               type="date"
//               value={departureDate}
//               onChange={handleDepartureDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         )}

//         {/* Destination Country and Airport Selection */}
//         <div className="mb-4">
//           <h2 className="text-lg font-medium mb-2">Select Destination</h2>
//           <select
//             value={destinationCountry}
//             onChange={handleDestinationCountryChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select destination country</option>
//             {countriesData.countries.map((country) => (
//               <option key={country.code} value={country.code}>
//                 {country.name}
//               </option>
//             ))}
//           </select>

//           {destinationCountry &&
//             destinationCountryData?.airports?.length > 0 && (
//               <select
//                 value={destinationAirport}
//                 onChange={handleDestinationAirportChange}
//                 className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">
//                   {destinationAirport || "Select destination airport"}
//                 </option>
//                 {destinationCountryData.airports.map((airport) => (
//                   <option
//                     key={airport.code}
//                     value={JSON.stringify({
//                       code: airport.code,
//                       city: airport.city,
//                     })}
//                   >
//                     {airport.code} - {airport.city}
//                   </option>
//                 ))}
//               </select>
//             )}
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
//           </div>
//         ) : (
//           originAirport &&
//           destinationAirport && (
//             <>
//               <div className="text-[22px]">Available Flights</div>
//               <div className="flex mt-6 items-center gap-4">
//                 <div>
//                   <div className="text-lg font-medium">
//                     {originAirport || "Origin"}
//                   </div>
//                   <div className="text-sm font-medium">({departureTime})</div>
//                 </div>
//                 <div className="flex-grow bg-gray-300 h-px text-center">
//                   {getTimeDifference(departureTime, arrivalTime)}
//                 </div>
//                 <div>
//                   <div className="text-lg font-medium">
//                     {destinationAirport || "Destination"}
//                   </div>
//                   <div className="text-sm text-center font-medium">
//                     ({arrivalTime})
//                   </div>
//                 </div>
//               </div>
//             </>
//           )
//         )}
//       </div>
//       {!loading && Object.keys(weatherData).length > 0 && (
//         <WeatherCard data={weatherData} />
//       )}
//     </div>
//   );
// };

// export default App;
