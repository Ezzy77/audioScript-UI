import {useState} from "react";

export default function Translation(){
    const [textInput, setTextInput] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [translation, setTranslation] = useState('');


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
        <>
            <div className="mt-10 flex flex-col md:flex-row items-start justify-center h-screen space-x-0  md:space-x-4" style={{ height: '90vh' }}>
                <div className="card w-full md:w-96 h-auto bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex flex-col w-full items-start justify-start space-y-4">
                            <h1 className=" card-title">Translate Text or Document</h1>
                            <div className="flex flex-row w-full items-start justify-start">
                                <select className="select select-bordered select-xs w-auto max-w-xs">
                                    <option disabled selected>From Language</option>
                                    <option>English(US)</option>
                                    <option>English(GBT)</option>
                                    <option>French</option>
                                    <option>German</option>
                                    <option>Portuguese</option>
                                    <option>Spanish</option>
                                    <option>Chinese</option>
                                    <option>Arabic</option>
                                    <option>Japanese</option>
                                </select>
                                {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"  viewBox="0 0 24 24">*/}
                                <span className="iconify" data-icon="akar-icons:arrow-right" data-inline="false">-></span>
                                <select className="select select-bordered select-xs w-auto max-w-xs">
                                    <option disabled selected>To Language</option>
                                    <option>English(US)</option>
                                    <option>English(GBT)</option>
                                    <option>French</option>
                                    <option>German</option>
                                    <option>Portuguese</option>
                                    <option>Spanish</option>
                                    <option>Chinese</option>
                                    <option>Arabic</option>
                                    <option>Japanese</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Text to translate"
                                className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
                        </div>
                    </div>
                </div>
                <div className="card w-full md:w-1/3 h-auto  bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Translation Result</h2>
                        {/* Player for the audio goes here */}
                        <div className="p-4 flex flex-row justify-between">
                            <div className="flex flex-row">
                                {isTranslating && <h3>Translation Progress</h3>}
                                {isTranslating && <span className="loading loading-dots loading-lg"></span>}
                            </div>
                        </div>
                        {/* Display for the transcribed text goes here */}
                        <div className="p-4">
                            <p className="text-lg">
                                {translation ? translation : "Translation will appear here"}
                            </p>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn " disabled={!translation || isTranslating}>
                            Download Transcript
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}