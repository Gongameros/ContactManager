import React, { Component } from 'react';
import ContactTable from './ContactTable';
import EditContactForm from './EditContactForm';

export default class FetchContacts extends Component {
    static displayName = FetchContacts.name;

    state = {
        contacts: [],
        loading: true,
        filter: '',
        sortBy: null,
        sortAsc: true,
        editingContact: null,
        errors: {}
    };

    componentDidMount() {
        this.populateContacts();
    }

    async populateContacts() {
        const response = await fetch('contact');
        const data = await response.json();
        this.setState({ contacts: data, loading: false });
    }

    handleFilterChange = event => {
        this.setState({ filter: event.target.value });
        //this.populateContacts();
    };

    handleSort = fieldName => {
        const { sortBy, sortAsc } = this.state;
        if (fieldName === sortBy) {
            this.setState({ sortAsc: !sortAsc });
        } else {
            this.setState({ sortBy: fieldName, sortAsc: true });
        }
    };

    handleEditClick = contact => {
        this.setState({ editingContact: contact, errors: {} });
    };

    handleFieldChange = (fieldName, value) => {
        this.setState(prevState => {
            const errors = { ...prevState.errors };

            switch (fieldName) {
                case 'name':
                    if (value.trim() === '') {
                        errors.name = 'Name cannot be empty';
                    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                        errors.name = 'Name should contain only alphabetic characters';
                    } else {
                        delete errors.name;
                    }
                    break;

                case 'dateOfBirth':
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (!dateRegex.test(value)) {
                        errors.dateOfBirth = 'Date of Birth should be in the format YYYY-MM-DD';
                    } else {
                        delete errors.dateOfBirth;
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(value)) {
                        errors.phone = 'Phone number should be 10 digits';
                    } else {
                        delete errors.phone;
                    }
                    break;
                case 'salary':
                    if (isNaN(value) || value <= 0) {
                        errors.salary = 'Salary should be a positive number';
                    } else {
                        delete errors.salary;
                    }
                    break;
                default:
                    break;
            }

            return {
                editingContact: {
                    ...prevState.editingContact,
                    [fieldName]: value
                },
                errors
            };
        });
    };

    handleEditSubmit = async () => {
        const { editingContact, errors } = this.state;

        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            // If there are errors, do not proceed with the submission
            return;
        }

        // Proceed with submitting the changes
        const patchDocument = Object.keys(editingContact).map(key => ({
            op: "replace",
            path: `/${key}`,
            value: editingContact[key]
        }));
        await fetch(`contact/${editingContact.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify(patchDocument)
        });
        // Refresh the contacts after editing
        this.populateContacts();
        // Reset editing state
        this.setState({ editingContact: null });
    };

    getFilteredContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.trim().toLowerCase();
        console.log(normalizedFilter);

        return contacts.filter(contact =>
            Object.values(contact).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(normalizedFilter);
                } else if (typeof value === 'number') {
                    return value.toString().includes(normalizedFilter);
                } else if (typeof value === 'boolean') {
                    return value.toString() === normalizedFilter;
                } else if (value instanceof Date) {
                    // Convert date to string in format "YYYY-MM-DD"
                    const dateString = value.toISOString().split('T')[0];
                    return dateString.includes(normalizedFilter);
                }
                return false;
            })
        );
    };





    render() {
        const { loading, filter, editingContact, errors } = this.state;
        const filteredContacts = this.getFilteredContacts();
        console.log(filteredContacts);

        return (
            <div>
                <h1 id="tableLabel">Contacts table</h1>
                <input
                    type="text"
                    placeholder="Filter by name or phone..."
                    value={filter}
                    onChange={this.handleFilterChange}
                />
                <EditContactForm
                    editingContact={editingContact}
                    errors={errors}
                    onFieldChange={this.handleFieldChange}
                    onSubmit={this.handleEditSubmit}
                />
                <ContactTable
                    loading={loading}
                    contacts={filteredContacts}
                    filter={filter}
                    sortBy={this.state.sortBy}
                    sortAsc={this.state.sortAsc}
                    onSort={this.handleSort}
                    onEditClick={this.handleEditClick}
                />
            </div>
        );
    }
}
