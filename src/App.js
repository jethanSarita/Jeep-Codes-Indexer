import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import routes from './routes.json'


function App() {

  const colors = {
    red: '#FF0000',
  }

  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState({})

  const handleInputOnChange = (e) => {
    setInputText(e.target.value)
  }

  const handleOnKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter pressed')
      locRoute()
    }
  }

  const locRoute = () => {
    //array (I really need to transition to typescrpit)
    const jeepCodes = inputText.split(',').map(code => code.trim())
    console.log('Jeep Codes: ')
    console.log(jeepCodes)

    //object
    const res = {}

    jeepCodes.forEach(currCode => {
      //array
      const route = routes[currCode]
      console.log(`${currCode} Route: `)
      console.log(route)

      if (route) {
        res[currCode] = hlLocs(route, jeepCodes)
      } else {
        res[currCode] = "Invalid Jeep Code"
      }
    })

    setOutputText(res)
  }

  const hlLocs = (route, jeepCodes) => {
    return route.map(loc => {
      const color = getColor(loc, jeepCodes)
      return <span style={{color: color}}>{loc}</span>
    }).reduce((prev, curr) => [prev, ' <-> ', curr])
  }

  const getColor = (loc, jeepCodes) => {
    const commonJeepCodes = jeepCodes.filter(code => routes[code] && routes[code].includes(loc))
    if (commonJeepCodes.length > 1) {
      return colors.red
    } else {
      return '#000000'
    }
  };

  return (
    <div>
      <input
        type='text'
        value={inputText}
        onChange={handleInputOnChange}
        onKeyDown={handleOnKeyDownEnter}
      />
      <button onClick={locRoute}>Enter</button>
      <p>Output:</p>
      <ul>
        {Object.entries(outputText).map(([code, route]) => (
          <li key={code}>
            <strong>{code}:</strong> {route}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
