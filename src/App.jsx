import NavBar from "./components/NavBar.jsx";
import HomePage from "./HomePage.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Transcribe from "./Transcribe.jsx";
import Translate from "./Translate.jsx";


function App() {
  //const [count, setCount] = useState(0)

  return (
      <Router >
          <>
              <NavBar />
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Transcribe" element={<Transcribe />} />
                  <Route path="/Translate" element={<Translate />} />
              </Routes>
              <Footer />
          </>
      </Router>
  )
}
export default App
