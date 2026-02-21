import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Contxt } from './Components/Context';
import Card from './Components/Card';
import Chart from './Components/Chart';
import './App.css';

function App() {
  const [loading, setloading] = useState(true);
  const deta = Contxt();

  // 1. Move the logic into a stable function
  // We remove [deta.city] from the dependency array so the function 
  // doesn't change while the user is typing.
  const get = useCallback(async () => {
    // If there's no city, don't fetch
    if (!deta.city) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array keeps 'get' stable

  // 2. Only run ONCE on mount
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // 3. Instead of blocking the whole app with a loading screen,
  // only block if we have NO data at all yet.
  if (loading && !deta.info.name) return <h1>loading...</h1>;

  return (
    <div>
      <Card get={get} />
      {/* Show a mini loader or just the chart if data exists */}
      {loading ? <p>Updating...</p> : <Chart />}
    </div>
  );
}

export default App;
