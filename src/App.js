import {Routes,Route} from 'react-router-dom' 
import Home from './Pages/Home/Home';
import './App.css'
import Summary from './Pages/Summary/Summary';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Home/>} path='/'/>
      </Routes>
      <Routes>
        <Route element={<Summary/>} path='/summary'/>
      </Routes>
      <Routes>
        <Route element={<Login/>} path='/login'/>
      </Routes>
      <Routes>
        <Route element={<Signup/>} path='/signup'/>
      </Routes>
    </div>
  );
}

export default App;
