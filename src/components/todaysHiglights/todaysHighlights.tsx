import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CityInterface,
  fetchTodaysHightlights,
  ITodayHighlight,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";

import {
  CoupleWeatherDetailsDiv,
  SunTimeDiv,
  SunTimeInfo,
  TemmperatureDiv,
  TodaysHightlightsContainer,
  TodaysHightlightSet,
  TodaysHightlightsIcon,
  WeatherDetailsDiv,
  WeatherDetailsIcon,
  WeatherDetailsSet,
} from "./todaysHighlights.Styled";

export const TodaysHightlights = () => {
  const todaysHighlights: ITodayHighlight | null = useSelector(
    (state: StoreType) => state.daysForecastReducer.todaysHightLights,
  );

  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );

  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchTodaysHightlights({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      }),
    );
  }, [selectedCity]);

  return (
    <TodaysHightlightsContainer className="today Q">
      <h1>{"Основная информация"}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TodaysHightlightSet className="today">
          <div className="suns">
            <SunTimeDiv>
              <TodaysHightlightsIcon src="assets/sunriseTH.png" alt="sunrise" />
              <SunTimeInfo >
                <h5>Восход</h5>
                <h5>{todaysHighlights?.sunriseTime}</h5>
              </SunTimeInfo>
            </SunTimeDiv>
            <SunTimeDiv>
              <TodaysHightlightsIcon src="assets/sunsetTH.png" alt="sunset" />
              <SunTimeInfo>
                <h5>Закат</h5>
                <h5>{todaysHighlights?.sunsetTime}</h5>
              </SunTimeInfo>
            </SunTimeDiv>
          </div>
          <TemmperatureDiv>
            <h3>{todaysHighlights?.temperature}°C</h3>
          </TemmperatureDiv>
          <WeatherDetailsSet className="weather-detail">
            <CoupleWeatherDetailsDiv className="weather-detail">
              <WeatherDetailsDiv>
                <WeatherDetailsIcon
                  src="assets/humidityTH.png"
                  alt="humidity"
                />
                <h5>{todaysHighlights?.humidity}%</h5>
                <h5>Влажность</h5>
              </WeatherDetailsDiv>
              <WeatherDetailsDiv>
                {" "}
                <WeatherDetailsIcon src="assets/windTH.png" alt="pressure" />
                <h5>{todaysHighlights?.windSpeed}км/ч</h5>
                <h5>Скорость ветра</h5>
              </WeatherDetailsDiv>
            </CoupleWeatherDetailsDiv>
            <CoupleWeatherDetailsDiv>
              <WeatherDetailsDiv>
                <WeatherDetailsIcon
                  src="assets/pressureTH.png"
                  alt="pressure"
                />
                <h5>{todaysHighlights?.pressure}hPa</h5>
                <h5>Давление</h5>
              </WeatherDetailsDiv>
              <WeatherDetailsDiv style={{ marginLeft: "32px" }}>
                <WeatherDetailsIcon src="assets/uvTH.png" alt="pressure" />
                <h5>{todaysHighlights?.uvIndex}</h5>
                <h5>UV</h5>
              </WeatherDetailsDiv>
            </CoupleWeatherDetailsDiv>
          </WeatherDetailsSet>
        </TodaysHightlightSet>
      )}
    </TodaysHightlightsContainer>
  );
};
