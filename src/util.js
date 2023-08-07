import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const caseTypeColor = {
  cases: {
    hex: "#CC1034",
    multiplier: 80,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 120,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 200,
  },
};

export const prettyPrintStats = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : 0;

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const showDataMap = (data, caseType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={
        caseType === "cases"
          ? "#CC1034"
          : caseType === "recovered"
          ? "#7dd71d"
          : "#fb4443"
      }
      fillColor={
        caseType === "cases"
          ? "#CC1034"
          : caseType === "recovered"
          ? "#7dd71d"
          : "#fb4443"
      }
      radius={Math.sqrt(country[caseType]) * caseTypeColor[caseType].multiplier}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
              height: "80px",
              backgroundSize: "cover",
              width: " 100px",
              borderRadius: "5px",
            }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
