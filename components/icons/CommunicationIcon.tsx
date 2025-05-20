import React from "react";

interface CommunicationIconProps {
    [key: string]: any;
}

const CommunicationIcon: React.FC<CommunicationIconProps> = (props) => {
    return (
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.12565 8H8.87565M4.12565 11.1667H8.87565M10.459 15.125H2.54232C1.66787 15.125 0.958984 14.4161 0.958984 13.5417V2.45833C0.958984 1.58388 1.66787 0.875 2.54232 0.875H6.9644C7.17436 0.875 7.37573 0.958408 7.52419 1.10687L11.8104 5.39313C11.9589 5.54159 12.0423 5.74296 12.0423 5.95292V13.5417C12.0423 14.4161 11.3334 15.125 10.459 15.125Z"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CommunicationIcon;
