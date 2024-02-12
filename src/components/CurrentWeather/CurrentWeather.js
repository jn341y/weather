import { useEffect } from "react";
import { capitalize, getWeatherImage, getWindDirection, importImages, uvIndexScale } from "../../utils";
import "./CurrentWeather.scss";

const CurrentWeather = ({ weather, mainClass }) => {
    const current = weather.weatherData.currentConditions;
    const icons = importImages(require.context("../../images/icons", false, /\.(png|jpe?g|svg)$/));
    const images = importImages(require.context("../../images/weather", false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        const getClasses = () => {
            const imageClass = getWeatherImage(current.icon, "class");
            current.datetimeEpoch >= current.sunriseEpoch && current.datetimeEpoch < current.sunsetEpoch
                ? mainClass("day " + imageClass)
                : mainClass("night " + imageClass);
        }
        getClasses();
    }, [current, mainClass]);

    return (
        <div className="p-2 mx-2 my-3 current-weather text-center">
            <div className="container cw-display">
                <div className="city"><h2 className="mb-0">{weather.location.label && weather.location.label}</h2></div>
                <div className="m-2 d-flex justify-content-center align-items-center">
                    <div className="me-3 ps-2 text-center">
                        <div className="mb-2 d-flex justify-content-center temperature">{typeof current.temp === "number" && (<><span>{Math.round(current.temp)}</span><span className="deg">&deg;</span></>)}</div>
                        {current.conditions && <div className="condition">{current.conditions}</div>}
                    </div>
                    <div className="text-center">
                        <img className="weather-image" src={images[`${(current.icon ? current.icon : "na")}.png`]} alt={current.conditions ? current.conditions : "weather-image"} />
                    </div>
                </div>
            </div>
            <div className="container px-0 py-2 mt-3 cw-datapoints">
                <div className="d-flex">
                    <div className="flex-grow-1 text-center data">
                        <div className="icon pb-1"><img src={icons["humidityw.png"]} alt="humidity" /></div>
                        <div className="datavalue">{typeof current.humidity === "number" ? (<> {Math.round(current.humidity)}% </>) : "-"}</div>
                        <div className="datapoint">Humidity</div>
                    </div>
                    <div className="flex-grow-1 text-center data">
                        <div className="icon pb-1"><img src={icons["windw.png"]} alt="wind" /></div>
                        <div className="datavalue">
                            {typeof current.windspeed === "number" 
                                ? (<>
                                    {(current.winddir !== undefined || current.winddir !== null) && (<> {getWindDirection(current.winddir)}  &nbsp;</>)} 
                                    {Math.round(current.windspeed)} mph
                                    </>)
                                : "-"
                            }
                        </div>
                        <div className="datapoint">Wind</div>
                    </div>
                    <div className="flex-grow-1 text-center data">
                        <div className="icon pb-1"><img src={icons["uv-indexw.png"]} alt="uv index" /></div>
                        <div className="datavalue">{typeof current.uvindex === "number" ? uvIndexScale(Math.round(current.uvindex)) : "-"}</div>
                        <div className="datapoint">UV Index</div>
                    </div>
                    <div className="d-none d-sm-block flex-grow-1 text-center data">
                        <div className="icon pb-1"><img src={icons["precipitationw.png"]} alt="precipitation" /></div>
                        <div className="datavalue">{typeof current.precipprob === "number" ? (<>{current.preciptype !== null && (<> {capitalize(current.preciptype[0])} &nbsp;</>)} {current.precipprob}%</>) : "-"}</div>
                        <div className="datapoint">Precipitation</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
