import './App.css';
import Routing from './Routing';
import Loading from './Component/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Routing />
    <Loading />
    <ToastContainer />
    </>
  )
}

export default App;
