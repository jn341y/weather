import { useState } from "react";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DisplayDays from "./components/DisplayDays/DisplayDays";
import searchImage from "./images/weather-search.png";

const App = () => {
    const [weatherData, setWeatherData] = useState({});
    const [weatherClass, setWeatherClass] = useState("day");

    const getWeather = (weatherData) => {
        setWeatherData(weatherData);
    }

    return (
        <main className={`d-flex justify-content-center ${weatherClass && weatherClass}`}>
            <div className="main-container">
                <Search weather={weatherData} getWeather={getWeather} />
                {Object.keys(weatherData).length > 0 
                    ? (
                        <>
                            <CurrentWeather weather={weatherData} mainClass={setWeatherClass} />
                            <DisplayDays dayWeather={weatherData.weatherData} />
                        </>
                        )
                    : (
                        <div className="py-5 m-2 no-search">
                            <div className="text-center"><h2>Search for a city</h2></div>
                            <div className="my-5 text-center"><img src={searchImage} alt="weather search" width={150} /></div>
                        </div>
                        )
                }
            </div>
        </main>
    );
}

export default App;
