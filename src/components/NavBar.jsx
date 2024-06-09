import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <div className="navbar flex justify-between  bg-base-100 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Transcribe">Transcription</Link>
                        </li>
                        <li>
                            <Link to="/Translate">Translation</Link>
                        </li>
                    </ul>
                </div>
                <Link className="btn btn-ghost text-xl ml-10" to="/">audioScript</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Transcribe">Transcription</Link>
                    </li>
                    <li>
                        <Link to="/Translate">Translation</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end mr-10">
                <Link to="/Login" className="btn">Login</Link>
                {/*<a href={} className="btn">Login</a>*/}
            </div>
            {/*<div className="navbar-end">*/}
            {/*    <a className="btn">Logout</a>*/}
            {/*</div>*/}
        </div>
    );
}