import './App.css';

import { useEffect, useState } from 'react';
import SignIn from "./components/signIn";
import SignUp from './components/signUp';
import NavBar from './components/Navbar';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  const [currencyData, setCurrencydata] = useState();

const fetchData = async () => {
  fetch('https://v6.exchangerate-api.com/v6/571948dbe808fdc2782e5019/codes')
  .then(response => response.json())
  .then(data => setCurrencydata(data.supported_codes.map((currData) => {
    return {
      id: currData[0],
      name: currData[1],
    };
  })))
}

  useEffect(()=> {
    fetchData();
  }, [])
  
  console.log(currencyData)
  return (
    <div className="App">
      <SearchBar data={currencyData}/>
      <NavBar></NavBar>
      <SignUp></SignUp>
    </div>
  );
}

export default App;
