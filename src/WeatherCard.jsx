import React from "react";

const WeatherCard = ({ data }) => {
  // Destructure the necessary data from the API response
  const {
    location: { name, country, localtime },
    current: {
      temperature,
      weather_icons,
      weather_descriptions,
      humidity,
      wind_speed,
      visibility,
      feelslike,
    },
  } = data;

  return (
    <div className="w-[30%] mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <div className="text-center text-[50px] font-teko text-blue-400 mb-4">
        Weather
      </div>

      {/* Location and Date */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {name}
          <br />
          <span className="text-sm text-gray-400">{country}</span>
        </h2>
        <p className="text-sm text-gray-400">
          {new Date(localtime).toLocaleString("en-US", {
            year: "2-digit",
            month: "short",
          })}
        </p>
      </div>

      {/* Weather Icon and Temperature */}
      <div className="flex items-center justify-center my-4">
        <img
          src={weather_icons[0]}
          alt={weather_descriptions[0]}
          className="w-20 h-20 rounded-full border-2 border-blue-400"
        />
        <div className="ml-6">
          <h3 className="text-3xl font-semibold text-blue-300">
            {temperature}°C
          </h3>
          <p className="text-gray-300">{weather_descriptions[0]}</p>
        </div>
      </div>

      {/* Additional Weather Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Feels Like</p>
          <p className="text-lg font-medium text-blue-300">{feelslike}°C</p>
        </div>
        <div className="text-center bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Humidity</p>
          <p className="text-lg font-medium text-blue-300">{humidity}%</p>
        </div>
        <div className="text-center bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Wind Speed</p>
          <p className="text-lg font-medium text-blue-300">{wind_speed} km/h</p>
        </div>
        <div className="text-center bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Visibility</p>
          <p className="text-lg font-medium text-blue-300">{visibility} km</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
