import './App.css';
import Navabr from './components/Navabr';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <NoteState>
          <Router>
            <Navabr />
            <Alert message = "Acheiving goals in one day InshaaAllah" type= "success"/>
        <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
        </div>
          </Router>
      </NoteState>
    </>
  );
}

export default App;
