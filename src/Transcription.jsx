import {useState} from "react";
import axios from "axios";

export default function Transcription(){
    const [selectedFile, setSelectedFile] = useState();
    const [selected, setSelected] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [transcription, setTranscription] = useState("");
    const [transcribing, setTranscribing] = useState(false);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const [isLoadingTranscription, setIsLoadingTranscription] = useState(false);

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
        setSelected(true);
    };

    const fileUploadHandler = async () => {
        setIsLoadingUpload(true);
        const fd = new FormData();
        fd.append("file", selectedFile);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/v1/api/upload`, fd,{
                onUploadProgress: ProgressEvent => {
                    const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
                    if (progress < 100) {
                        setUploadPercentage(progress);
                    }
                },
            });
            console.log(res);
            setUploadPercentage(100);
            const job = {
                s3_uri: res.data.s3_uri,
                language_code: 'en-US' // Replace with the actual language code
            };
            await startTranscriptionJob(job);
        } catch(err) {
            console.error('Error:', err);
            setUploadPercentage(0);
        }
        setIsLoadingUpload(false);
        setUploadPercentage(0)
    };

    const startTranscriptionJob = async (job) => {
        setIsLoadingTranscription(true);
        setTranscribing(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/v1/api/transcript`,
                 job,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    onUploadProgress: ProgressEvent => {
                        const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
                        if (progress < 100) {
                            setSelected(true);
                        }
                    },
                }
            );
            console.log(response);
            const transcriptText = response.data.result.results.transcripts[0].transcript;
            setTranscription(transcriptText);
            setTranscribing(false);
        } catch (error) {
            console.error(error);
        }
        setIsLoadingTranscription(false);
    };

    return (
        <>
            <div className="mt-10 flex flex-col md:flex-row items-start justify-center h-screen space-x-0  md:space-x-4" style={{ height: '90vh' }}>
                <div className="card w-full md:w-96 h-auto bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex flex-col w-full items-stretch justify-start space-y-4">
                            <h1 className="text-3xl font-bold mb-6">Transcribe Audio</h1>
                            <input
                                type="file"
                                onChange={fileSelectedHandler}
                                className="file-input file-input-bordered"/>
                            <progress className="progress progress-success" value={uploadPercentage}
                                      max="100"></progress>
                            <button
                                onClick={fileUploadHandler}
                                disabled={!selected || isLoadingUpload || isLoadingTranscription}
                                className={`btn w-full ${
                                    (!selected || isLoadingUpload || isLoadingTranscription) && 'opacity-50 cursor-not-allowed'
                                }`}
                            >
                                {isLoadingUpload ? 'Uploading...' : 'Upload video or audio file'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card w-full md:w-1/2 h-auto  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Transcription Result</h2>
                        {/* Player for the audio goes here */}
                        <div className="p-4 flex flex-row justify-between">
                            <audio controls>
                                <source src="file.wav" type="audio/wav"/>
                                Your browser does not support the audio element.
                            </audio>
                            <div className="flex flex-row">
                                {transcribing && <h3>Transcription Progress</h3>}
                                {transcribing && <span className="loading loading-dots loading-lg"></span>}
                            </div>
                        </div>
                        {/* Display for the transcribed text goes here */}
                        <div className="p-4">
                            <p className="text-lg">
                                {transcription ? transcription : "Transcription will appear here"}
                            </p>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn " disabled={!transcription || isLoadingUpload || isLoadingTranscription}>
                                Download Transcript
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}