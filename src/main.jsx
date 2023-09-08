import React, { useState, createContext, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import axios from 'axios';

// AuthContext
const AuthContext = createContext();

function AuthContextProvider(props) {
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ name: "Guest" });

  // isAuth : false => true ให้ delay 1 วิ
  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 3000)
  //   }
  // }, [isAuth]);

  // const handleAuth = () => {
  //   // logun : isAuth : false => true
  //   if (!isAuth) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsAuth(true);
  //       setIsLoading(false);
  //     }, 3000)
  //   } else {
  //     setIsAuth(false);
  //   }
  // };

  const handleAuth = async () => {
    // Login to Logout
    if (isAuth) {
      setIsAuth(false)
      return;
    }

    // Logout to Login
    try {
      setIsLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users/1")
      setUser(response.data)
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
  };

  return <AuthContext.Provider value={{ isAuth, handleAuth, isLoading, user }}>{props.children}</AuthContext.Provider>
}

function App() {
  const { isAuth, handleAuth, isLoading, user } = useContext(AuthContext)
  return (
    <div className='App'>
      {isLoading ? <h1>Loading...</h1> : <h1>Welcome... {!isAuth ? 'Guest' : user?.name}</h1>}
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