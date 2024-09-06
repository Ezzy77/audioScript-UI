import { supabase } from './supabaseClient';
import {useState} from "react";

const signInWithGoogle = async (event, setLoading, setError) => {
    event.preventDefault()
    setLoading(true);
    const {error } = await supabase.auth.signInWithOAuth({
        provider: "google",
    });
    setLoading(false);
    if (error) {
        setError(error.message);
    }
};

const signInWithGithub = async (event, setLoading, setError) => {
    event.preventDefault()
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
    });
    setLoading(false);
    if (error) {
        setError(error.message);
    }
};

export default  function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-20">
                    <form className="card-body">
                        <p>Sign or Register</p>
                        <div className="flex flex-col">
                            <button onClick={(event) => signInWithGoogle(event, setLoading, setError)}
                                    className=" btn flex items-center dark:bg-gray-900 shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white mb-2">
                                <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                     xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px"
                                     viewBox="-0.5 0 48 48" version="1.1"><title>Google-color</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                                <path
                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                    id="Fill-1" fill="#FBBC05"></path>
                                                <path
                                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                    id="Fill-2" fill="#EB4335"></path>
                                                <path
                                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                    id="Fill-3" fill="#34A853"></path>
                                                <path
                                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                    id="Fill-4" fill="#4285F4"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span>{loading ? 'Signing in...' : 'Continue with Google'}</span></button>
                            <button
                                onClick={(event) => signInWithGithub(event, setLoading, setError)}
                                className="btn flex items-center dark:bg-gray-900 shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white mb-2"
                            >
                                <svg
                                    className="h-6 w-6 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    width="24px"
                                    height="24px"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.022c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.604-2.665-.303-5.467-1.334-5.467-5.934 0-1.311.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.52 11.52 0 013.003-.403c1.02.005 2.047.137 3.003.403 2.29-1.554 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.221 0 4.61-2.806 5.628-5.478 5.922.431.372.815 1.103.815 2.222v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{loading ? 'Signing in...' : 'Continue with GitHub'}</span>
                            </button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}