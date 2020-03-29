import React, { useState , useEffect } from 'react'
import countryService from '../services/countriesService'
import '../../src/index.css'

const WeatherDetails = (props) =>
    {
        const [location,setLocation] = useState('')
        const [temperature,setTemperature] = useState('')
        const [weatherIcons,setWeatherIcons] = useState('')
        const [windSpeed, setWindSpeed] = useState('')
        const [windDirection, setWindDirection] = useState('')
        
        let capitalCity = props.capital        

        useEffect(() => {        
                countryService.getWeatherDetails(capitalCity)
                .then(response => {        
                        const apiResponse = response
                        
                        setLocation(apiResponse.location.name)
                        setTemperature(apiResponse.current.temperature)
                        setWeatherIcons(apiResponse.current.weather_icons)
                        setWindSpeed(apiResponse.current.wind_speed)
                        setWindDirection(apiResponse.current.wind_dir)  
                    })
                    .catch(error => console.log(error))
                }, [])   

        return (
            <div>
                temperature: {temperature} Celcius
                <p />                
                <img width="100" height="100" src={weatherIcons} alt={location}/> 
                <p />
                wind: {windSpeed} mph direction {windDirection}                
            </div>
        )
}

const Countries = () =>
{
    const [country, setCountry] = useState('')
    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        countryService
            .getAll()
            .then(initialCountries => {
                setCountries(initialCountries)
            })
        }, [])

    const handleCountryChange = (event) =>
    {        
        setCountry(event.target.value)
        setFilterName(event.target.value)
    }
    
    const MultipleCountries = ({country}) =>
    {    
        let selectedCountry = country

        return (
                <li>
                    {country.name}   <button onClick={() => setFilterName(selectedCountry.name)}>show</button>                     
                </li>
            )
    }

    const SingleCountry = (props) =>
    {
        return (
            <div>        
                find countries : <input value={props.selectedCountry.name} />
                <p />                
                <h1>{props.selectedCountry.name}</h1>
                <p />
                capital : {props.selectedCountry.capital}
                <p />
                population : {props.selectedCountry.population}
                <p />                
                <h3>languages</h3>
                    <ul>
                        <li>{props.selectedCountry.languages.map((languauge,i) =>
                                        <li key={i}>{languauge.name}</li>
                                    )}
                        </li>
                    </ul>
                <p />
                <img width="200" height="200" src={props.selectedCountry.flag} alt={props.selectedCountry.name}/> 
                <p />
                <h3>Weather in {props.selectedCountry.capital}</h3><WeatherDetails capital={props.selectedCountry.capital} />                    
            </div>
        )
    }

    const countriesToShow = filterName === "" ? 
    countries : 
    countries.filter(country => country.name.toLocaleLowerCase().indexOf(filterName.toLocaleLowerCase()) !== -1)

    if ((filterName !== "") && (countriesToShow.length > 10))
    {
        window.alert("Too many matches, specify another filter")        
    }    
    else if ((filterName !== "") && (countriesToShow.length < 10) && (countriesToShow.length > 2))
    {
        // window.alert("Less than 10 countries selected")                
    }
    else if ((filterName !== "") && (countriesToShow.length === 1))
    {
        // window.alert("A Single country selected") 

        let selectedCountry = countriesToShow[0]
        
        return SingleCountry(selectedCountry={selectedCountry})        
    }

    return (
        <div>
            find countries<input value={country} onChange={handleCountryChange}/>            
            <ul>
                {countriesToShow.map((country,i) =>
                    <MultipleCountries key={i} country={country} />
                )}
            </ul>
        </div>
    )
}

export default Countries