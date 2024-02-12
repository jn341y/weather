import Accordion from 'react-bootstrap/Accordion';
import Day from "./Day";
import "./DisplayDays.scss";

const DisplayDays = ({ dayWeather }) => {
    const dayElements = dayWeather.days.slice(0, 7).map((day) => (
        <Day key={day.datetime} day={day} offset={dayWeather.tzoffset} />
    ));

    return (
        <div className="forecast-container px-3 px-sm-4 pt-2 pb-5">
            <h2 className="ps-2 my-3 title">7-Day Forecast</h2>
            <Accordion>
                {dayElements}
            </Accordion>
        </div>
    );
};

export default DisplayDays;
