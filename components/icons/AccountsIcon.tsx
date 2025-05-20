import React from "react";

interface AccountsIconProps {
    [key: string]: any;
}

const AccountsIcon: React.FC<AccountsIconProps> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.5 16.1314C2.5 13.7409 3.84325 11.8027 5.5 11.8027H8.5C10.1567 11.8027 11.5 13.7409 11.5 16.1314"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.85616 4.63604C9.88129 5.66117 9.88129 7.32322 8.85616 8.34835C7.83103 9.37348 6.16898 9.37348 5.14385 8.34835C4.11872 7.32322 4.11872 5.66117 5.14385 4.63604C6.16898 3.61091 7.83103 3.61091 8.85616 4.63604"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 11.1074H15.25C16.4927 11.1074 17.5 12.4779 17.5 14.1689"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.4508 5.16636C16.1831 5.8986 16.1831 7.08578 15.4508 7.81801C14.7186 8.55024 13.5314 8.55024 12.7992 7.81801C12.0669 7.08578 12.0669 5.89859 12.7992 5.16636C13.5314 4.43413 14.7186 4.43413 15.4508 5.16636"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default AccountsIcon;  
