import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to audioScript</h1>
                    <p className="py-6">
                        Where language barriers are a thing of the past. Unlock seamless
                        communication and global connectivity with our
                        innovative AI powered speech-to-text and document
                        translation solution.
                    </p>
                    <p className="py-6">
                        From effortlessly transcribing meetings to translating documents
                        with precision, empower your team to collaborate across languages
                        and cultures like never before.
                    </p>
                    <Link to="/transcription">
                        <button className="btn btn-primary">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}