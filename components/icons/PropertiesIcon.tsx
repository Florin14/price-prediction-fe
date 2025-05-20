import React from "react";

interface PropertiesIconProps {
    [key: string]: any;
}

const PropertiesIcon: React.FC<PropertiesIconProps> = (props) => {
    return (
        <svg width="15" height="17" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.375 7.62467L9.5 2.08301L16.625 7.62467V16.333C16.625 16.7529 16.4582 17.1557 16.1613 17.4526C15.8643 17.7495 15.4616 17.9163 15.0417 17.9163H3.95833C3.53841 17.9163 3.13568 17.7495 2.83875 17.4526C2.54181 17.1557 2.375 16.7529 2.375 16.333V7.62467Z"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.125 17.9167V10H11.875V17.9167" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default PropertiesIcon;
