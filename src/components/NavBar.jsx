import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

// eslint-disable-next-line react/prop-types
export default function NavBar({ user }) {
    return (
        <div className="navbar flex items-center justify-center bg-base-100 px-4 py-2">
            <div className="navbar-content flex items-center">
                {/* Logo */}
                <Link className="btn btn-ghost text-xl mr-10" to="/">
                    audioScript
                </Link>

                {/* Centered Links */}
                <div className="navbar-center">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {user && (
                            <li>
                                <Link to="/Transcription">Transcription</Link>
                            </li>
                        )}
                    </ul>
                </div>

                {/* User Actions */}
                <div className="navbar-end ml-10">
                    {user ? (
                        <Link to="" className="btn" onClick={async () => await supabase.auth.signOut()}>
                            Logout
                        </Link>
                    ) : (
                        <Link to="/Login" className="btn">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

