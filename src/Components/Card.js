import React, { useState } from 'react'
import { Contxt } from './Context'

function Card({ get }) {
    const [check, setcheck] = useState(false)
    let value = Contxt()

    // In the free API, 'current' usually points to the response from /weather
    let crr = value.current 
    console.log('crr',crr);
    
    let day = value.data // This is your filtered 5-day array

    // Helper to format time safely
    const formatTime = (timestamp) => {
        if (!timestamp) return '--:--';
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Note: Free Forecast API provides sunrise/sunset in value.info.sys (from the current weather call)
    let sunrise = formatTime(value.info?.sys?.sunrise);
    let sunset = formatTime(value.info?.sys?.sunset);

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

                        <div className="input-group rounded mb-3">
                            <input 
                                type="search" 
                                className="form-control rounded" 
                                placeholder="City" 
                                onChange={(e) => value.setcity(e.target.value)} 
                            />
                            <button className="btn btn-light border" onClick={get}>
                                <span className="fw-bold">Check!</span>
                            </button>
                        </div>

                        <div className="card shadow-0 border">
                            <div className="card-body p-4">
                                <h4 className="mb-1 sfw-normal">{value.info?.name}, {value.info?.sys?.country}</h4>
                                
                                {/* Path changed: crr.temp -> crr.main.temp */}
                                <p className="mb-2">Current temperature: <strong>{crr?.main?.temp ?? crr?.temp}°C</strong></p>
                                
                                {/* Path changed: day[0].temp.max -> day[0].main.temp_max */}
                                <p>
                                    Max: <strong>{day[0]?.main?.temp_max}°C</strong>, 
                                    Min: <strong>{day[0]?.main?.temp_min}°C</strong>
                                </p>

                                <div className="d-flex flex-row align-items-center">
                                    <p className="mb-0 me-4">{day[0]?.weather?.[0].description}</p>
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${day[0]?.weather?.[0].icon}@2x.png`} 
                                        alt='weather icon' 
                                    />
                                </div>

                                <div className="mt-3">
                                    {check ? (
                                        <>
                                            {/* Path changed: crr.wind_speed -> crr.wind.speed */}
                                            <p className="mb-2">Humidity: <strong>{crr?.main?.humidity ?? crr?.humidity}%</strong></p>
                                            <p className="mb-2">Wind Speed: <strong>{crr?.wind?.speed ?? crr?.wind_speed} m/s</strong></p>
                                            <p className="mb-2">Pressure: <strong>{crr?.main?.pressure ?? crr?.pressure} hPa</strong></p>
                                            <p className="mb-2">Sunrise/Sunset: <strong>{sunrise} / {sunset}</strong></p>
                                        </>
                                    ) : null}
                                    <button 
                                        className='btn btn-primary w-100' 
                                        onClick={() => setcheck(!check)}
                                    >
                                        {check ? 'Show Less' : 'Show More'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Card