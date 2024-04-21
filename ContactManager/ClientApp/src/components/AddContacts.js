import React, { Component } from 'react';
import './AddContacts.css';

export default class AddContacts extends Component {
    static displayName = AddContacts.name;

    constructor(props) {
        super(props);
        this.state = { file: null, loading: false };
        // Create a reference for the file input element
        this.fileInputRef = React.createRef();
    }

    handleFileChange = event => {
        const selectedFile = event.target.files[0];
        this.setState({ file: selectedFile });
    };

    handleUpload = async () => {
        const { file } = this.state;
        if (!file) {
            alert('Please select a file.');
            return;
        }

        this.setState({ loading: true });

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('contact', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to upload file.');
            }

            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        } finally {
            this.setState({ loading: false });
        }
    };

    handleLabelClick = () => {
        // Trigger click on file input when the label is clicked
        this.fileInputRef.current.click();
    };

    render() {
        const { loading, file } = this.state;
        const selectedFileName = file ? file.name : ''; // Display selected file name

        return (
            <div>
                <h1 id="tableLabel">Add contacts</h1>
                <div className="upload-container">
                    <form>
                        <div className="file-input-container">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={this.handleFileChange}
                                className="file-input"
                                ref={this.fileInputRef} // Assign the ref to the file input element
                            />
                            <label htmlFor="file" className="file-label" onClick={this.handleLabelClick}>
                                Select File
                            </label>
                        </div>
                        <div className="label-input-container">
                            <label className="file-name-label">
                                {selectedFileName}
                            </label>
                        </div>
                        <div className="upload-button-container">
                            <button onClick={this.handleUpload} disabled={loading} className="upload-button">
                                {loading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
