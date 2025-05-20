import React from "react";

interface LockIconProps {
    [key: string]: any;
}

const LockIcon: React.FC<LockIconProps> = (props) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_765_17222)">
                <path
                    d="M4.5 7.5V6C4.5 3.5175 5.25 1.5 9 1.5C12.75 1.5 13.5 3.5175 13.5 6V7.5M9 13.875C9.49728 13.875 9.97419 13.6775 10.3258 13.3258C10.6775 12.9742 10.875 12.4973 10.875 12C10.875 11.5027 10.6775 11.0258 10.3258 10.6742C9.97419 10.3225 9.49728 10.125 9 10.125C8.50272 10.125 8.02581 10.3225 7.67417 10.6742C7.32254 11.0258 7.125 11.5027 7.125 12C7.125 12.4973 7.32254 12.9742 7.67417 13.3258C8.02581 13.6775 8.50272 13.875 9 13.875Z"
                    stroke="#313131"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V11.25C1.5 8.25 2.25 7.5 5.25 7.5H12.75C15.75 7.5 16.5 8.25 16.5 11.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5Z"
                    stroke="#313131"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_765_17222">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default LockIcon;
