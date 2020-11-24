import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
} from "@material-ui/core";
import numeral from "numeral";

import "./App.css";
import "leaflet/dist/leaflet.css";
import { sortData, prettyPrintStat } from "./util.js";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import Footer from "./Footer";


function App() {

  const [country, setCountry] = useState(["worldwide"]);
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -42.4796
  });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {

    const url = "https://disease.sh/v3/covid-19/all";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })

  }, []);

  useEffect(() => {
    const getCountriesData = async () => {

      const url = "https://disease.sh/v3/covid-19/countries";

      await fetch(url)
        .then((response) => response.json())
        .then((data) => {

          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));

          let sortedData = sortData(data);

          setCountries(countries);
          setTableData(sortedData);
          setMapCountries(data);
        });
    };

    getCountriesData();


  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19T</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>

          </FormControl>

        </div>

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            isRed
            active={casesType === "cases"}
            title="Cases"
            cases={countryInfo.todayCases}
            total={numeral(countryInfo.cases).format("0.0a")}
          />

          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            active={casesType === "recovered"}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={numeral(countryInfo.cases).format("0.0a")}
          />

          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
        </div>

        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />

      </div>

      <Card className=".app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>


      </Card>

      <Footer />
    </div>
  );
}

export default App;
