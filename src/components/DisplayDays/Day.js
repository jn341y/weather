import Accordion from "react-bootstrap/Accordion";
import { getCondition, getLocalDay, getWeatherImage, getWindDirection, importImages, toStandardTime, uvIndexScale } from "../../utils";

const Day = ({ day, offset }) => {
    const images = importImages(require.context("../../images/icons", false, /\.(png|jpe?g|svg)$/));
    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <Accordion.Item className="data-display" eventKey={randomNum(100, 999)}>
            <Accordion.Header>
                <div className="container">
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1 text-start date">{(typeof day.datetimeEpoch === "number" && typeof offset === "number") && getLocalDay(offset, day.datetimeEpoch)}</div>
                        <div className="pe-sm-2 flex-grow-1 text-center text-sm-end icon">{day.icon && getWeatherImage(day.icon, "icon")}</div>
                        <div className="d-none d-sm-inline-block flex-grow-1 text-start conditions">{day.conditions && getCondition(day.conditions)}</div>
                        <div className="pe-sm-3 flex-grow-1 text-end high-low">
                            {(typeof day.tempmax === "number" && typeof day.tempmin === "number") && (
                                <>{Math.round(day.tempmax)}&deg; &middot; {Math.round(day.tempmin)}&deg;</>
                            )}
                        </div>
                    </div>
                </div>
            </Accordion.Header>
            <Accordion.Body className="pt-1 px-0">
                <div className="container">
                    {day.description && (
                        <div className="py-2 px-0 text-center">
                                {day.description}
                        </div>
                    )}
                    {typeof day.windspeed === "number" && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["windw.png"]} alt="wind" /></div>
                            <div className="col-4 flex-grow-1 me-3 me-sm-0 datapoint">Wind</div>
                            <div className="col-5 flex-grow-1 text-end datavalue">
                                {(day.winddir !== undefined || day.winddir !== null) && getWindDirection(day.winddir)} &nbsp;
                                {Math.round(day.windspeed)} mph
                            </div>
                        </div>
                    )}
                    {typeof day.precipprob === "number" && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["precipitationw.png"]} alt="precipitation" /></div>
                            <div className="col-4 flex-grow-1 me-3 me-sm-0 datapoint">Precipitation</div>
                            <div className="col-5 flex-grow-1 text-end datavalue">
                                {day.precipprob}%
                                {day.preciptype !== null && (<><span className="d-none d-sm-inline-block">&nbsp;chance of</span> {day.preciptype[0]}</>)}
                            </div>
                        </div>
                    )}
                    {typeof day.humidity === "number" && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["humidityw.png"]} alt="humidity" /></div>
                            <div className="col-5 flex-grow-1 me-3 me-sm-0 datapoint">Humidity</div>
                            <div className="col-4 flex-grow-1 text-end datavalue">{Math.round(day.humidity)}%</div>
                        </div>
                    )}
                    {day.sunrise && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["sunrisew.png"]} alt="sunrise" /></div>
                            <div className="col-5 flex-grow-1 me-3 me-sm-0 datapoint">Sunrise</div>
                            <div className="col-4 flex-grow-1 text-end datavalue">{toStandardTime(day.sunrise)}</div>
                        </div> 
                    )}
                    {day.sunset && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["sunsetw.png"]} alt="sunset" /></div>
                            <div className="col-5 flex-grow-1 me-3 me-sm-0 datapoint">Sunset</div>
                            <div className="col-4 flex-grow-1 text-end datavalue">{toStandardTime(day.sunset)}</div>
                        </div>
                    )}
                    {typeof day.uvindex === "number" && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["uv-indexw.png"]} alt="uv index" /></div>
                            <div className="col-4 flex-grow-1 datapoint">UV Index</div>
                            <div className="col-6 flex-grow-1 text-end datavalue">{Math.round(day.uvindex)} &middot; {uvIndexScale(Math.round(day.uvindex))}</div>
                        </div>
                    )}
                    {typeof day.visibility === "number" && (
                        <div className="row align-items-center">
                            <div className="col-1 me-2 me-sm-0 icon"><img src={images["visibilityw.png"]} alt="visibility" /></div>
                            <div className="col-5 flex-grow-1 me-3 me-sm-0 datapoint">Visibility</div>
                            <div className="col-4 flex-grow-1 text-end datavalue">{Math.round(day.visibility)} mi</div>
                        </div>
                    )}
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default Day;
