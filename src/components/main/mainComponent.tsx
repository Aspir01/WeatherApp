import { HourlyForecast } from "../hourlyForecast/hourlyForecast";
import { SearchLocation } from "../searchLocation/searchLocation";
import { TodaysHightlights } from "../todaysHiglights/todaysHighlights";
import { MainContainer } from "./mainComponent.Styled";

export const Main = () => {
  return (
    <MainContainer>
      <div>
        <SearchLocation />
        <div className="info">
          <TodaysHightlights />
          <HourlyForecast />
        </div>
      </div>
    </MainContainer>
  );
};
