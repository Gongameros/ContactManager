import React from 'react';

const ContactTable = ({ contacts, sortBy, sortAsc, onSort, onEditClick }) => {
    const renderSortIcon = fieldName => {
        if (fieldName === sortBy) {
            return sortAsc ? '▲' : '▼';
        }
        return null;
    };

    const handleSort = fieldName => {
        if (fieldName === sortBy) {
            onSort(fieldName, !sortAsc);
        } else {
            onSort(fieldName, true);
        }
    };

    const sortedContacts = contacts.slice().sort((a, b) => {
        if (sortBy) {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortBy === 'dateOfBirth') {
                const parsedDateA = new Date(aValue);
                const parsedDateB = new Date(bValue);
                return sortAsc ? parsedDateA - parsedDateB : parsedDateB - parsedDateA;
            } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortAsc ? aValue - bValue : bValue - aValue;
            } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return sortAsc ? (aValue === bValue ? 0 : aValue ? -1 : 1) : aValue === bValue ? 0 : aValue ? 1 : -1;
            }
        }
        return 0;
    });


    return (
        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>
                        Name {renderSortIcon('name')}
                    </th>
                    <th onClick={() => handleSort('dateOfBirth')}>
                        Date of birth {renderSortIcon('dateOfBirth')}
                    </th>
                    <th onClick={() => handleSort('married')}>
                        Married {renderSortIcon('married')}
                    </th>
                    <th onClick={() => handleSort('phone')}>
                        Phone {renderSortIcon('phone')}
                    </th>
                    <th onClick={() => handleSort('salary')}>
                        Salary {renderSortIcon('salary')}
                    </th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {sortedContacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.dateOfBirth}</td>
                        <td>{contact.married.toString()}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.salary}</td>
                        <td>
                            <button onClick={() => onEditClick(contact)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ContactTable;
