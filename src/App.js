import ReactDOM from "react-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

const api = {
  key: "436ff3db589f092969e909073b241eee",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const icons = (i) => {
    if (i == "Rain") {
      return <FontAwesomeIcon icon={faCloudRain} />;
    } else if (i == "Clouds") {
      return <FontAwesomeIcon icon={faCloud} />;
    } else if (i == "Snow") {
      return <FontAwesomeIcon icon={faSnowflake} />;
    } else {
      return <FontAwesomeIcon icon={faSun} />;
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {icons(weather.weather[0].main)} {Math.round(weather.main.temp)}
                °C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="info-box">
              <div className="box-text">
                Feels Like {Math.round(weather.main.feels_like)}°C
              </div>
              <div className="box-text">
                Temp max {Math.round(weather.main.temp_max)}°C
              </div>
              <div className="box-text">
                Tem min {Math.round(weather.main.temp_min)}°C
              </div>
              <div className="box-text">
                Humidity {Math.round(weather.main.humidity)}%
              </div>
              <div className="box-text">
                Wind {Math.round(weather.wind.speed)}km/h
              </div>
              <div className="box-text">
                Visibility {weather.visibility / 1000}km
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
