import './App.css';
import './scss/Menu.scss';
import React from 'react';
import Menu from './component/Menu.js'
import { useState,createContext } from 'react';
export const themeContext  = createContext();
function App() {
  
  const [Darktheme,setTheme] = useState(true);
  return (
    <themeContext.Provider value={Darktheme}>
      <div className={`App ${Darktheme?"bg-dark":"bg-light"}`}>
          <Menu theme={Darktheme} setTheme={setTheme}/>
      </div>
    </themeContext.Provider>
  );
}

export default App;
