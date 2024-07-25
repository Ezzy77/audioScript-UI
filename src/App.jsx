import NavBar from "./components/NavBar.jsx";
import Home from "./Home.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Transcription from "./Transcription.jsx";
import Translation from "./Translation.jsx";
import DevelopmentNotice from "./components/DevelopmetNotice.jsx";
import Register from "./Register.jsx";
import Verify from "./Verify.jsx";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import {supabase} from "./supabaseClient.js";
import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUserProfile = async (user) => {
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        const email = localStorage.getItem('email');

        const { error } = await supabase
            .from('Profiles')
            .upsert([
                { id: user.id, first_name: firstName, last_name: lastName, email: email }
            ]);

        if (error) {
            console.log('Error creating user profile');
            return;
        }
        localStorage.clear();
    }

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
            if (session?.user && session?.user?.email_confirmed_at) {
                createUserProfile(session.user)
                    .then(() => console.log('User profile created successfully'))
                    .catch(() => console.error('Error creating user profile'))
            }
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
            <DevelopmentNotice/>
            <NavBar user={user}/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route element={<PrivateRoutes user={user}/>}>
                    <Route element={<Transcription/>} path="/Transcription"/>
                    <Route element={<Translation/>} path="/Translation"/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/verify" element={<Verify/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App
