import React from 'react';
import './EditContactForm.css';


const EditContactForm = ({ editingContact, errors, onFieldChange, onSubmit }) => {
    if (!editingContact) {
        return null; // checks if the edit button pressed
    }
    return (
        <div className="input-wrapper">
            <h2 id="tableLabel" className="edit-title">Edit contact</h2>
            <div className="edit-field-contact">
                <label className="edit-label-contact">Name</label>
                <input
                    type="text"
                    value={editingContact.name}
                    onChange={e => onFieldChange('name', e.target.value)}
                />
                {errors.name && (
                    <span className="error-message">{errors.name}</span>
                )}
            </div>
            <div className="edit-field-contact">
                <label className="edit-label-contact">Date of Birth</label>
                <input
                    type="text"
                    value={editingContact.dateOfBirth}
                    onChange={e => onFieldChange('dateOfBirth', e.target.value)}
                />
                {errors.dateOfBirth && (
                    <span className="error-message">{errors.dateOfBirth}</span>
                )}
            </div>
            <div className="edit-field-contact">
                <label className="edit-label-contact">Married</label>
                <input
                    type="checkbox"
                    checked={editingContact.married}
                    onChange={e => onFieldChange('married', e.target.checked)}
                />
                {errors.married && (
                    <span className="error-message">{errors.married}</span>
                )}
            </div>
            <div className="edit-field-contact">
                <label className="edit-label-contact">Phone</label>
                <input
                    type="text"
                    value={editingContact.phone}
                    onChange={e => onFieldChange('phone', e.target.value)}
                />
                {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                )}
            </div>
            <div className="edit-field-contact">
                <label className="edit-label-contact">Salary</label>
                <input
                    type="number"
                    value={editingContact.salary}
                    onChange={e => onFieldChange('salary', e.target.value)}
                />
                {errors.salary && (
                    <span className="error-message">{errors.salary}</span>
                )}
            </div>
            <div className="save-button">
                <button onClick={onSubmit}>Save</button>
            </div>
        </div>
    );
};


export default EditContactForm;
