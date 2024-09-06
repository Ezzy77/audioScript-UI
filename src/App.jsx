import NavBar from "./components/NavBar.jsx";
import Home from "./Home.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Transcription from "./Transcription.jsx";
import Verify from "./Verify.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import {supabase} from "./supabaseClient.js";
import {useEffect, useState} from "react";

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getSession = async () => {
            // Check if there is a session
            const { data: session } = await supabase.auth.getSession();
            setUser(session?.user || null); // Set user data or null if no session
            setLoading(false);
        };
        // fetch session on components mount
        getSession();
        // Listen for changes in auth state
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Router>
            <NavBar user={user}/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route element={<PrivateRoutes user={user}/>}>
                    <Route element={<Transcription/>} path="/Transcription"/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/verify" element={<Verify/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}
