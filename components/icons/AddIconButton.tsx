import React from "react";

interface AddIcon {
    [key: string]: any;
}

const AddIconButton: React.FC<AddIcon> = (props) => {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8.5H12" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 12.5L8 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


    );
};

export default AddIconButton;