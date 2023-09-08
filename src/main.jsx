import React, { useState, createContext, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// AuthContext
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // isAuth : false => true ให้ delay 1 วิ
  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000)
  //   }
  // }, [isAuth]);

  const handleAuth = () => {
    // logun : isAuth : false => true
    if (!isAuth) {
      setIsLoading(true);
      setTimeout(() => {
        setIsAuth(true);
        setIsLoading(false);
      }, 3000)
    } else {
      setIsAuth(false);
    }
  };
  return <AuthContext.Provider value={{ isAuth, handleAuth, isLoading }}>{props.children}</AuthContext.Provider>
}

function App() {
  const { isAuth, handleAuth, isLoading } = useContext(AuthContext)
  return (
    <div className='App'>
      {isLoading ? <h1>Loading...</h1> : <h1>Wlcome... {!isAuth ? 'Guest' : 'User'}</h1>}
      <button onClick={handleAuth} disabled={isLoading}>{!isAuth ? 'Login' : 'Logout'}</button>
    </div>
  );
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)

{/* <h3>Welcome.. Guest</h3>
<button>Login</button> */}