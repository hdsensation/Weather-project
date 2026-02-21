import axios from 'axios';
import { useEffect, useState, useCallback } from 'react'; // 1. Added useCallback
import { Contxt } from './Components/Context';
import Card from './Components/Card';
import Chart from './Components/Chart';
import './App.css';

function App() {
  const [loading, setloading] = useState(true);
  const deta = Contxt();

  // 2. Wrap get in useCallback so it's defined in the main scope
  const get = useCallback(async () => {
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
  }, [deta.city]); // Only recreate function if city changes

  // 3. Effect calls the memoized get()
  useEffect(() => {
    get();
  }, [get]);

  if (loading) return <h1>loading</h1>;

  return (
    <div>
      {/* 4. Now 'get' is defined and accessible here */}
      <Card get={get} />
      <Chart />
    </div>
  );
}

export default App;
