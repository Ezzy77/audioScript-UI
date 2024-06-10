import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { supabase } from './supabaseClient';


export default function Register(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // New state variable for loading


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
            options:{
                emailRedirectTo: `${location.origin}/login`
            }
        });

        setLoading(false);
        if (error) {
            setError(error.message);
                return;
        }
        if (!error){
            navigate('/verify')
            setError('User Created Successfully');
        }

        console.log(user, session);

    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse justify-between">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mr-20">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="first name" className="input input-bordered" required
                                   value={firstName} onChange={(e) => setFirstname(e.target.value)}
                            />
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="last name" className="input input-bordered" required
                                   value={lastName} onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required
                                   value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required
                                   value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? <span className="loading loading-spinner loading-lg"></span>
                                    : 'Register'}
                            </button>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                    <div className="text-center mt-4">
                        <p className="py-6">Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}