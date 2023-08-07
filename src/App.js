import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStats, sortData } from "./util";
import LineGraph from "./LineGraph";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldWide");
  const [countryInfo, setCountryInfo] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [zoom, setZoom] = useState(3);
  const [mapConteries, setMapCountries] = useState([]);
  const [casesType, setCasestype] = useState("cases");

  useEffect(() => {
    if (countries.length === 0) {
      getCountriesData();
    }
  }, [countries]);

  useEffect(() => {
    if (!countryInfo) {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => {
          setCountryInfo(data);
        });
    }
  }, [countryInfo]);

  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        const countryData = data.map((m) => {
          return {
            name: m.country,
            value: m.countryInfo.iso2,
          };
        });
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countryData);
      });
  };

  const onCountryChange = async (e) => {
    const url =
      country === "worldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${e.value}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const countryCordinates =
          mapConteries[mapConteries.findIndex((fi) => fi.country === e.name)];
        setMapCenter({
          lat: countryCordinates.countryInfo.lat,
          lng: countryCordinates.countryInfo.long,
        });
        setZoom(5);
        setCountry(e.value);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              value={country}
              // onChange={(e) => onCountryChange(e)}
              variant="outlined"
            >
              <MenuItem value="worldWide">WorldWide</MenuItem>
              {countries.map((m, i) => (
                <MenuItem
                  onClick={() => onCountryChange(m)}
                  value={m.value}
                  key={i}
                >
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasestype("cases")}
            title="corona virus cases"
            cases={prettyPrintStats(countryInfo?.todayCases)}
            total={countryInfo?.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasestype("recovered")}
            title="Recovered"
            cases={prettyPrintStats(countryInfo?.todayRecovered)}
            total={countryInfo?.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasestype("deaths")}
            title="Death"
            cases={prettyPrintStats(countryInfo?.todayDeaths)}
            total={countryInfo?.deaths}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapConteries}
          center={mapCenter}
          zoom={zoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table countries={tableData} />
          <h3>World wide new Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
