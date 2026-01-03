import React from 'react'

const WeatherCard = ({title, value}) => {
  return (
     <div className='weather-card'>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  )
}

export default WeatherCard
