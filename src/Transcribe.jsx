import {useState} from "react";

export default function Transcribe(){

    // State to store the uploaded audio file
    const [audioFile, setAudioFile] = useState(null);

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setAudioFile(file);
    };

    // Function to submit the audio file for transcription
    const handleSubmit = () => {
        // Implement transcription logic here
        console.log('Transcribing audio file:', audioFile);
        // You can send the file to your backend for transcription using APIs
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Transcribe Audio</h1>
            <input
                type="file"
                onChange={handleFileUpload}
                className="file-input file-input-bordered w-full max-w-xs"/>
            <button
                onClick={handleSubmit}
                disabled={!audioFile}
                className={` btn btn-wide m-5 ${
                    !audioFile && 'opacity-50 cursor-not-allowed'
                }`}
            >
                Transcribe
            </button>
        </div>
    );
}