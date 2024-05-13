import {useState} from "react";

export default function Translate(){
    const [inputType, setInputType] = useState('file');
    const [documentFile, setDocumentFile] = useState(null);
    const [textInput, setTextInput] = useState('');

    // Function to switch between file upload and text input
    const toggleInputType = (type) => {
        setInputType(type);
        setDocumentFile(null);
        setTextInput('');
    };

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setDocumentFile(file);
    };

    // Function to handle text input change
    const handleTextInputChange = (event) => {
        const text = event.target.value;
        setTextInput(text);
    };

    // Function to submit the input for translation
    const handleSubmit = () => {
        // Implement translation logic here
        if (inputType === 'file') {
            console.log('Translating document file:', documentFile);
            // You can send the file to your backend for translation using APIs
        } else {
            console.log('Translating text input:', textInput);
            // You can send the text input to your backend for translation using APIs
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Translate Document or Text</h1>
            <div className="flex mb-4">
                <button
                    onClick={() => toggleInputType('file')}
                    className={` btn btn-outline m-5 ${
                        inputType === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                    }`}
                    >
                    Upload Document
                </button>

                <button
                    onClick={() => toggleInputType('text')}
                    className={`btn btn-outline m-5 ${
                        inputType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                    }`}
                >
                    Enter Text
                </button>
            </div>
            {inputType === 'file' ? (
                <input
                    type="file"
                    accept=".docx, .pdf"
                    onChange={handleFileUpload}
                    className="file-input file-input-bordered w-full max-w-xs"
                />
            ) : (
                <textarea
                    value={textInput}
                    onChange={handleTextInputChange}
                    placeholder="Text"
                    className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                />

                )}
            <button
                onClick={handleSubmit}
                disabled={inputType === 'file' ? !documentFile : !textInput}
                className={`btn btn-outline m-5 ${
                    (inputType === 'file' && !documentFile) || (inputType === 'text' && !textInput)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                }`}
            >
                Translate
            </button>
        </div>
    );
}