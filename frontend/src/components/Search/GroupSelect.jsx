import React, { useState, useEffect } from 'react';
import styles from "./GroupSelect.module.css";
//import { useNavigate } from 'react-router-dom'; 
//import Button from '../button/Button'; 
import axios from 'axios';


function GroupSelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    useEffect(() => {
        fetchAllGroups();
    }, []);

    const fetchAllGroups = async () => {
        try {
            const response = await axios.get('https://nexuspod-backend.onrender.com/groups');
            setGroups(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    function clearGroups() {
        onChange(undefined)
    }

    function selectGroup(id) {
        const selectedGroup = groups.find(group => group._id === id);
        if (selectedGroup) {
            onChange({ label: selectedGroup.name, value: selectedGroup._id });
        } else {
            // Handle the case where the group with the specified ID is not found
            
        }
        setIsOpen(false);
    }

    function isGroupSelected(group){
        return group?.name === value?.label;
    }


    return (
        <div 
            onClick={() => setIsOpen(prev => !prev)} 
            onBlur={() => setIsOpen(false)}
            tabIndex={0} 
            className={styles.container}>

            

            <span className={styles.value}> {value?.label}</span>
            <button 
                className={styles["clear-btn"]}
                onClick={e => {
                    e.stopPropagation()
                    clearGroups()
                }}>
                &times;
            </button>
            <ul className={`${styles.groups} ${isOpen ? styles.show : ""}`}>
                    {groups.map((group, index) => (
                        <li 
                        key={group._id} 
                        onClick={e => {
                            e.stopPropagation()
                            selectGroup(group._id)
                            setIsOpen(false)
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className = {`
                            ${styles.group} 
                            ${isGroupSelected(group) ? styles.selected : "" }
                            ${index === highlightedIndex ? styles.highlighted : ""}
                        `}
                        >
                            {group.name}
                        </li>
                    ))}
            </ul>

        </div>
    );
}

export default GroupSelect;
