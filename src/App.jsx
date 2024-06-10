import NavBar from "./components/NavBar.jsx";
import Home from "./Home.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Transcribe from "./Transcribe.jsx";
import Translate from "./Translate.jsx";
import DevelopmentNotice from "./components/DevelopmetNotice.jsx";


function App() {
  //const [count, setCount] = useState(0)

  return (
      <Router >
          <>
              <DevelopmentNotice />
              <NavBar />
              <Routes>
                  <Route path="/" element={<Home />} />
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
