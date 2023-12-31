import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import windDirectionArrow from "../../assets/wind_direction.png";
import {
  CityInterface,
  fetchHourlyForecast,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";
import { Weathercode, WeathercodeImg } from "../utility/weathercode.Styled";
import { getImageByWeathercode } from "../utility/weatherImages";
import { getWindDirection } from "../utility/windDirection";
import {
  WindDirectionDiv,
  WindDirectionImg,
} from "../utility/windDirectionStyled";

import {
  HourContainer,
  HourlyContainer,
  HourlyForecastDiv,
} from "./hourlyForecastStyled";

export const HourlyForecast = () => {
  const fiveRelevantHours = useSelector(
    (state: StoreType) => state.daysForecastReducer.fiveRelevantHours,
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
      fetchHourlyForecast({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        timezone: selectedCity.timezone,
      }),
    );
  }, [selectedCity]);

  return (
    <HourlyForecastDiv className="hour">
      <h1>Почасовой прогноз</h1>
      <HourlyContainer className="weather">
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          fiveRelevantHours.map((item, index) => (
            <HourContainer key={index} className="hourwidth">
              <h3>{item.time}</h3>
              <Weathercode>
                <WeathercodeImg
                  weathercode={item.weathercode}
                  src={getImageByWeathercode(item.weathercode)}
                  alt="weathercode_img"
                  className="weathIcon"
                ></WeathercodeImg>
              </Weathercode>

              <h4>{item.temperature}°C</h4>
              <WindDirectionDiv>
                <WindDirectionImg
                  rotate={getWindDirection(item.windDirection).rotate}
                  src={windDirectionArrow}
                  alt="arrow"
                ></WindDirectionImg>
                <h4>{getWindDirection(item.windDirection).direction}</h4>
              </WindDirectionDiv>
              <h4> {item.windGusts} км/ч</h4>
            </HourContainer>
          ))
        )}
      </HourlyContainer>
    </HourlyForecastDiv>
  );
};
