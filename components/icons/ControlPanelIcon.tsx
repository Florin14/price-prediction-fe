import React from "react";

interface ControlPanelIconProps {
    [key: string]: any;
}

const ControlPanelIcon: React.FC<ControlPanelIconProps> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_1155_1264)">
                <path d="M2.71094 3.42822H6.62396V8.64558H2.71094V3.42822Z" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.71094 10.9937H6.62396V13.6023H2.71094V10.9937Z" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.49219 8.646H13.4052V13.8634H9.49219V8.646Z" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.49219 3.42822H13.4052V6.0369H9.49219V3.42822Z" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1155_1264">
                    <rect width="15.6521" height="15.6521" fill="white" transform="translate(0.363281 0.819824)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default ControlPanelIcon;
