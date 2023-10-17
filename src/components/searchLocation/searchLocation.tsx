import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "usehooks-ts";
import "./searchLocation.css"

import {
  CityInterface,
  fetchSearchLocation,
  setSearchLocation,
} from "../../redux/reducers/APIreducer";
import { AppDispatch, StoreType } from "../../redux/store";

import { Clock } from "./clock";

export const SearchLocation = () => {
  const searchState: string = useSelector(
    (state: StoreType) => state.daysForecastReducer.search,
  );
  const searchStateDebaunse = useDebounce<string>(searchState, 700);
  const selectedCity: CityInterface = useSelector(
    (state: StoreType) => state.daysForecastReducer.selectedCity,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (event: any) => {
    dispatch(setSearchLocation(event.target.value));
  };
  const { loading, error } = useSelector(
    (state: StoreType) => state.daysForecastReducer,
  );
  useEffect(() => {
    if (searchStateDebaunse) {
      dispatch(fetchSearchLocation(searchStateDebaunse));
    }
  }, [searchStateDebaunse]);

  return (
    <div className="cities">
      <h2>Введите свой город:</h2>
      <input type="text" onChange={handleInputChange} />
      <h2>Выбранный город:</h2>
      <p>
        {selectedCity.name}, {selectedCity.country}
      </p>
      <h2>Дата и время:</h2>
      <Clock />
    </div>
  );
};
