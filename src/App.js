import './App.css';
import Navabr from './components/Navabr';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <NoteState>
          <Router>
            <Navabr />
            <Alert message = "Acheiving goals in one day InshaaAllah"/>
        <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
        </div>
          </Router>
      </NoteState>
    </>
  );
}

export default App;
