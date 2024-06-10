import NavBar from "./components/NavBar.jsx";
import Home from "./Home.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Transcribe from "./Transcribe.jsx";
import Translate from "./Translate.jsx";
import DevelopmentNotice from "./components/DevelopmetNotice.jsx";
import Register from "./Register.jsx";
import Verify from "./Verify.jsx";
// import EmailVerification from "./EmailVerification.jsx";


function App() {
  //const [count, setCount] = useState(0)

  return (
      <Router >
          <DevelopmentNotice />
          <NavBar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path="/transcribe" element={<Transcribe />} />
              <Route path="translate" element={<Translate />} />
              <Route path="/verify" element={<Verify />} />
              {/*<Route path="/auth/verify-email" element={<EmailVerification />} />*/}
          </Routes>
          <Footer />
      </Router>
  )
}
export default App
