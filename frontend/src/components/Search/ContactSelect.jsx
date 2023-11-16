import React, { useState, useEffect } from 'react';
import styles from "./ContactSelect.module.css";
import axios from 'axios';

function ContactSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    useEffect(() => {
        fetchAllContacts();
    }, []);

    const fetchAllContacts = async () => {
        try {
            const response = await axios.get('https://nexuspod-backend.onrender.com/contacts');
            setContacts(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    function clearContact() {
        onChange(null); // Clear the selected contact by passing null
    }

    function selectContact(id) {
        const selectedContact = contacts.find(contact => contact._id === id);
        if (selectedContact) {
            onChange(selectedContact._id); // Set the selected contact's ID
        } else {
            // Handle the case where the contact with the specified ID is not found
        }
        setIsOpen(false);
    }

    function isContactSelected(contact) {
        return contact?._id === value; // Check if the contact's ID matches the value
    }

    return (
        <div className={styles["contact-select-container"]}>
            <div
                onClick={() => setIsOpen(prev => !prev)}
                onBlur={() => setIsOpen(false)}
                tabIndex={0}
                className={styles.container}
            >
                <span className={styles.value}> {value ? contacts.find(contact => contact._id === value)?.name : ''}</span>
                <button
                    className={styles["clear-btn"]}
                    onClick={e => {
                        e.stopPropagation()
                        clearContact()
                    }}>
                    &times;
                </button>
                <ul className={`${styles.contacts} ${isOpen ? styles.show : ""}`}>
                    {contacts.map((contact, index) => (
                        <li
                            key={contact._id}
                            onClick={e => {
                                e.stopPropagation()
                                selectContact(contact._id)
                                setIsOpen(false)
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`
                                ${styles.contact}
                                ${isContactSelected(contact) ? styles.selected : "" }
                                ${index === highlightedIndex ? styles.highlighted : ""}
                            `}
                        >
                            {contact.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ContactSelect;
