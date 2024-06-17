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
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import {supabase} from "./supabaseClient.js";
import {useEffect, useState} from "react";
// import EmailVerification from "./EmailVerification.jsx";


function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
            }
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
      <Router >
          <DevelopmentNotice />
          <NavBar user={user} />
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route element={<PrivateRoutes user={user} />}>
                  <Route element={<Transcribe/>} path="/Transcribe" />
                  <Route element={<Translate/>} path="/Translate"/>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<Verify />} />
          </Routes>
          <Footer />
      </Router>
  )
}
export default App
