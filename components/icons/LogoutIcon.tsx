import React from "react";

interface LogoutIconProps {
    [key: string]: any;
}

const LogoutIcon: React.FC<LogoutIconProps> = (props) => {
    return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.79832 5.2605C7.05882 2.23529 8.61345 1 12.0168 1H12.1261C15.8824 1 17.3866 2.5042 17.3866 6.2605V11.7395C17.3866 15.4958 15.8824 17 12.1261 17H12.0168C8.63866 17 7.08403 15.7815 6.80672 12.8067M1 8.9916H11.8235"
                stroke="#313131"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M9.94922 6.17676L12.7643 8.99188L9.94922 11.807" stroke="#313131" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default LogoutIcon;
