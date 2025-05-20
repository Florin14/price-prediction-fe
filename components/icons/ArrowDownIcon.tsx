import React from "react";

interface ArrowDownIconProps {
    [key: string]: any;
}

const ArrowDownIcon: React.FC<ArrowDownIconProps> = (props) => {
    return (
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.32464 0.848211C5.49074 1.01432 5.49074 1.28363 5.32464 1.44973L3.19795 3.57642C3.03185 3.74252 2.76254 3.74252 2.59643 3.57642L0.469747 1.44973C0.303642 1.28362 0.303642 1.01432 0.469747 0.848211C0.635851 0.682106 0.90516 0.682106 1.07126 0.848211L2.89719 2.67414L4.72312 0.848211C4.88923 0.682107 5.15854 0.682107 5.32464 0.848211Z"
                fill="#64748B"
            />
        </svg>
    );
};

export default ArrowDownIcon;
