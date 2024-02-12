export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getCondition = (cond) => {
    const pos = cond.indexOf(", ");
    if (pos !== -1) {
        return cond.split(", ")[0];
    } else {
        return cond;
    }
};

export const getLocalDay = (offset, xEpoch) => {
    const date = new Date(xEpoch * 1000);
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const newDate = new Date(utc + (3600000 * offset));
    const dateString = newDate.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" });
    const final = dateString.split(", ");
    return (<> {final[0]} <span className="date-break">&middot;</span> {final[1]} </>);
};

export const getWeatherImage = (weather, type) => {
    const weatherIcons = {
        "clear-day": {
            icon: "\uF5A1",
            class: ""
        },
        "clear-night": {
            icon: "\uF494",
            class: ""
        },
        "cloudy": {
            icon: "\uF2C2",
            class: "cloudy"
        },
        "fog": {
            icon: "\uF2A6",
            class: "cloudy"
        },
        "partly-cloudy-day": {
            icon: "\uF2BD",
            class: "partly-cloudy"
        },
        "partly-cloudy-night": {
            icon: "\uF2AF",
            class: "cloudy"
        },
        "rain": {
            icon: "\uF2B3",
            class: "rain"
        },
        "showers-day": {
            icon: "\uF2B3",
            class: "rain"
        },
        "showers-night": {
            icon: "\uF2B3",
            class: "rain"
        },
        "snow": {
            icon: "\uF2BB",
            class: "snow"
        },
        "snow-showers-day": {
            icon: "\uF2BB",
            class: "snow"
        },
        "snow-showers-night": {
            icon: "\uF2BB",
            class: "snow"
        },
        "thunder-rain": {
            icon: "\uF2AA",
            class: "thunderstorm"
        },
        "thunder-showers-day": {
            icon: "\uF2AA",
            class: "thunderstorm"
        },
        "thunder-showers-night": {
            icon: "\uF2AA",
            class: "thunderstorm"
        },
        "wind": {
            icon: "\uF61D",
            class: ""
        }
    };
    
    if (type === "class") {
        return weatherIcons[weather].class;
    } else {
        return weatherIcons[weather].icon;
    }
};

export const getWindDirection = (angle) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
};

export const importImages = (i) => {
    let images = {};
    i.keys().forEach((item, index) => { images[item.replace("./", "")] = i(item); });
    return images;
};

export const toStandardTime = (militaryTime) => {
    let time = militaryTime.split(':');
    time[0] >= 12 ? time[3]="PM" : time[3]="AM";
    if (time[0] > 12)
        time[0] = time[0] - 12;
    if (time[0] < 1)
        time[0] = 12;
    return `${parseInt(time[0], 10)}:${time[1]} ${time[3]}`;
};

export const uvIndexScale = (uvIndex) => {
    if (uvIndex <= 2) {
        return "Low";
    } else if (uvIndex > 2 && uvIndex < 6) {
        return "Moderate";
    } else if (uvIndex === 6 || uvIndex === 7) {
        return "High";
    } else if (uvIndex > 7 && uvIndex <= 10) {
        return "Very High";
    } else if (uvIndex > 10) {
        return "Extreme";
    } else {
        return "-";
    }
};
