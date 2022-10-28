import './App.css';
import Navabr from './components/Navabr';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (AlertMessage, AlertType) => {
    setAlert({
      message: AlertMessage,
      type: AlertType,
    });
    setTimeout(() => {
      setAlert(alert);
    }, 3000);
  };

  return (
    <>
      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <NoteState>
          <Router>
            <Navabr />
            <Alert Alert={alert}/>
        <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login showAlert={showAlert}/>} />
              <Route path="/Signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
        </div>
          </Router>
      </NoteState>
    </>
  );
}

export default App;
