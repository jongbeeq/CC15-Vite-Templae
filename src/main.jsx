import React, { useState, createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// Context
// 1. createContext [Provider,Consumer] => ชื่อ Context
const ThemeContext = createContext();
console.log(ThemeContext);

// ###A1. สร้าง HOC : Higher Order Component [Provider]
// HOC คือ FC ที่รับ Component เข้าไป แล้ว return component ใหม่ออกมา
// function ThemeContextProvider(props) {
//   console.log(props.children)
//   return <div>Hi {props.children}</div>;
// }


/* ###A2. Share Data & Logic ผ่าน attribute value
==> Data (state,boolean,string,object,array,etc.)
==> Logic (Fn ที่ใช้ handle ต่างๆ)
*/

// Data : isDarkMode,styleObj
// Logic : setIsDarkMode,handleToggleTheme
function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const stylesObj = {
    backgroundColor: isDarkMode ? "black" : 'white',
    color: isDarkMode ? "white" : 'black'
  };
  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const shareObj = { theme: stylesObj, toggleTheme: handleToggleTheme };
  return <ThemeContext.Provider value={shareObj}>{props.children}</ThemeContext.Provider>;
}

/* ###A3. นำ Provider ไปครอบ Children [Provider]
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
*/

/* ### B1 : ดึงค่า Shared object ผ่านตัว useContext
SYNTAX : useContext(ContextName)

ex. const sharedObj = useContext(ThemeContext)
*/


// ###########################################
// ###########################################
// ###########################################

// UI
function App() {
  const s = useContext(ThemeContext)
  console.log(s);

  return <div className="App" style={s.theme}>
    <h1>Theme App</h1>
    <button onClick={s.toggleTheme}>Toggle Theme</button>
  </div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
)
