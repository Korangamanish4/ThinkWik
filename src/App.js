import './App.css';
import { useState, useEffect } from 'react'
import Routing from './Routing';
import Loading from './Component/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthRouting from './AuthRouting';
import { UserContext } from './Component/UserContext';
import { useDispatch } from 'react-redux';
import { saveUserData } from './Store/Actions/userAction';

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false)
const dispatch = useDispatch()

useEffect(() => {
  authenticateUser()
})

const authenticateUser = () => {
const isUserLoggedIn = localStorage.getItem("isLoggedIn")
if (isUserLoggedIn === "true"){
  const details = JSON.parse(localStorage.getItem("userDetails"))
  dispatch(saveUserData(details))
  setIsLoggedIn(true)
  console.log("IN")
}
else setIsLoggedIn(false)
}

  return (
    <UserContext.Provider value={setIsLoggedIn}>
    {isLoggedIn ? <Routing /> : <AuthRouting /> }
    <Loading />
    <ToastContainer />
    </ UserContext.Provider>
  )
}

export default App;
