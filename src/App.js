import axios from 'axios';
import { useEffect, useState } from 'react';
import { Contxt } from './Components/Context';
import Card from './Components/Card';
import Chart from './Components/Chart';
import './App.css'

function App() {
const [loading, setloading] = useState(true)  

  let deta=Contxt()
  console.log(deta.data)
  

 

  const get = async () => {
    setloading(true);
    try {
      // 1. Get Current Weather (Version 2.5 - Free)
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${deta.city}&units=metric&appid=7131d76449271d162d8aef8feb19706e`
      );
      
      // Set current info
      deta.setinfo(weatherRes.data);
      deta.setcr(weatherRes.data.main); // Pass the main weather object to your 'setcr'
  
      // 2. Get 5-Day Forecast (Version 2.5 - Free)
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${deta.city}&units=metric&appid=7131d76449271d162d8aef8feb19706e`
      );
  
      // FILTER: Pick the weather at 12:00 PM for each of the 5 days
      const dailyData = forecastRes.data.list.filter((reading) => 
        reading.dt_txt.includes("12:00:00")
      );
  
      console.log('Filtered Daily Data:', dailyData);
      deta.set(dailyData); // Update your daily state
  
    } catch (error) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
    } finally {
      setloading(false);
    }
  };



  
  useEffect(() => { 
    get()
  }, [])




  if(loading) return <h1>loading</h1>


  return (
    <div  >
      <Card get={get}/>
      <Chart/>
    </div>
  );
}

export default App;
