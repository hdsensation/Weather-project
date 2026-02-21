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
  
 useEffect(() => {
  const get = async () => {
    setloading(true);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${deta.city}&units=metric&appid=7131d76449271d162d8aef8feb19706e`
      );
      deta.setinfo(weatherRes.data);
      deta.setcr(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${deta.city}&units=metric&appid=7131d76449271d162d8aef8feb19706e`
      );

      const dailyData = forecastRes.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      deta.set(dailyData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setloading(false);
    }
  };

  get();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // We leave this empty because we only want it to run ONCE on load



  if(loading) return <h1>loading</h1>


  return (
    <div  >
      <Card get={get}/>
      <Chart/>
    </div>
  );
}

export default App;
