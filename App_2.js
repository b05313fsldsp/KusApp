import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
//dc-
import { Chart } from "react-google-charts";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8081/api")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setApi(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  const data = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540]
  ];
  const nulldata = [
  ];
  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <MainScreen title="KUS API">
        <div className="MyApp">
          <Chart
            chartType="LineChart"
            width="100%"
            height="200px"
            data={data}
            options={options}
          />
      </MainScreen>

      <ul>
        {api.map(item => (
          <li key={item.id}>
            {item.ttimestamps} {item.SPN1761}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
