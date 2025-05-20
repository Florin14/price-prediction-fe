import React from "react";

interface AddIcon {
    [key: string]: any;
}

const AddIcon: React.FC<AddIcon> = (props) => {
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 13H19.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 19.5L13 6.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
};

export default AddIcon;
