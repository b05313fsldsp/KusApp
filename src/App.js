import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";


async function fetchTqsJSON() {
  const response = await fetch("http://10.3.1.194:8081/api/tqs");
  const tqs = await response.json();
  return tqs;
}


function App() {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [api, setApi] = useState([]);

// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
useEffect(() => {
//fetch("http://10.3.1.194:8081/api/tqs")
//.then(res => res.json())
fetchTqsJSON().then(
(response ) => {
setIsLoaded(true);
setApi(response );
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

if (error) {
return <div>Error: {error.message}</div>;
} else if (!isLoaded) {
return <div>Loading...</div>;
} else {
return (
<ul>
{api.map(item => (
<li key={item.id}>
{item.SN}
<p/>
{item.SPN1761}
</li>
))}
</ul>
);
}
}

export default App;
