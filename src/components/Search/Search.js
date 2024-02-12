import { useState, useRef } from "react";
import axios from 'axios';
import { debounce } from 'lodash';
import { Form, Button, InputGroup, Spinner, ListGroup } from "react-bootstrap";
import "./Search.scss";

const Search = ({ weather, getWeather }) => {

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const [showList, setShowList] = useState(true);
    const inputRef = useRef(null);

    const searchCity = (query) => {
        const geoApiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
        const geoApiOptions = {
            headers: {
                "content-type": "application/octet-stream",
                "X-RapidAPI-Key": "[API_KEY]",
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
            params: {
                limit: 7,
                types: "CITY",
                sort: "-population",
                minPopulation: 30000,
                namePrefix: query
            }
        };
        axios
            .get(geoApiUrl, geoApiOptions)
            .then((response) => {
                const { data } = response.data;
                const { length } = data;
    
                setSearchResults(
                    length
                        ? data.map((i) => ({
                            coord: `${Math.trunc(i.latitude * 10000)/10000},${Math.trunc(i.longitude * 10000)/10000}`,  
                            label: `${i.city}, ${i.countryCode === "US" ? i.regionCode : i.country}`
                            })) 
                        : []
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    const searchWeather = (query) => {
        const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query.coord}`;
        const weatherApiOptions = {
            params: {
                key: "[API_KEY]",
                include: "days,current",
                iconSet: "icons2"
            }
        };
        axios
            .get(`${weatherApiUrl}`, weatherApiOptions)
            .then((response) => {
                getWeather(() => ({
                    location: query,
                    weatherData: response.data
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const cityFromIp = () => {
        const ipApiUrl = "https://api.ipdata.co?api-key=[API_KEY]";
        const ipApiOptions = {
            headers: {
                "Accept": "application/json"
            },
            params: {
                fields: "city,region,region_code,country_name,country_code,latitude,longitude"
            }
        };
        axios
            .get(ipApiUrl, ipApiOptions)
            .then((response) => {

                const ipData = {
                    coord: `${Math.trunc(response.data.latitude * 10000)/10000},${Math.trunc(response.data.longitude * 10000)/10000}`,  
                    label: response.data.country_code === "US" 
                        ? `${response.data.city}, ${response.data.region_code}` 
                        : response.data.city === null 
                            ? `${response.data.region}, ${response.data.country_name}`
                            : `${response.data.city}, ${response.data.country_name}`
                };
                searchWeather(ipData);
            })
            .catch((error) => {
                console.log(error);
            });
            
    };
    
    const citySearch = (city) => {
        if (!city || city.length < 2) {
            setSearchResults([]);
            setIsLoading(false);

            if (city.length > 0) {
                setShowClear(true);
            } else {
                setShowClear(false);
            }

        } else {
            setIsLoading(true);
            setShowClear(true);
            searchCity(city);
        }
    };

    const debounceCitySearch = debounce(citySearch, 700);

    const handleClear = () => {
        inputRef.current.value = "";
        setSearchResults([]);
        setIsLoading(false);
        setShowClear(false);
    };

    const handleCitySelect = (city) => {
        if (city) {
            searchWeather(city);
            handleClear();
        }
    };

    if (JSON.stringify(weather) === "{}") {
        cityFromIp();
    }

    return (
        <div className="m-3 mb-4 search-container" onBlur={() => setTimeout(setShowList, 200, false)}>
            <InputGroup className="search-group">
                <InputGroup.Text className="search-label">
                    &#xF52A;
                </InputGroup.Text>
                <Form.Control
                    ref={inputRef}
                    className="sg-input"
                    placeholder="Enter a city name..."
                    onChange={(e) => debounceCitySearch(e.target.value)}
                    onFocus={() => setShowList(true)}
                />
                <InputGroup.Text className="loading">
                    {isLoading && (
                        <Spinner animation="border" size="sm"><span className="visually-hidden">Loading...</span></Spinner>
                    )}
                </InputGroup.Text>
                {showClear && (
                    <Button onClick={handleClear}>Clear</Button>
                )}
            </InputGroup>
            {(!!searchResults.length && showList) && (
                <ListGroup>
                    {searchResults.map((item, index) => (
                        <ListGroup.Item action key={item + index} onClick={() => handleCitySelect(item)}>{item.label}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default Search;
