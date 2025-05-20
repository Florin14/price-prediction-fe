import React from "react";

interface EquipmentsProps {
    [key: string]: any;
}

const Equipments: React.FC<EquipmentsProps> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_1155_1322)">
                <path
                    d="M3.7819 8.99235V11.2157M1.55859 8.99235H3.7819H1.55859ZM6.00521 8.99235H3.7819H6.00521ZM3.7819 8.99235V6.76904V8.99235Z"
                    stroke="white"
                    strokeWidth="1.11165"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4.70703 4.54606L4.88849 4.33869C5.47902 3.6638 6.52891 3.6638 7.11943 4.33868L10.3376 8.01665C10.8266 8.57544 10.8266 9.40992 10.3376 9.96871L7.11943 13.6467C6.52891 14.3216 5.47902 14.3216 4.88849 13.6467L4.70703 13.4393"
                    stroke="white"
                    strokeWidth="1.11165"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9.71094 14.1806L13.3308 9.95751C13.8065 9.40243 13.8065 8.58336 13.3308 8.02827L9.71094 3.80518"
                    stroke="white"
                    strokeWidth="1.11165"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.6738 14.1806L16.2937 9.95751C16.7694 9.40243 16.7694 8.58336 16.2937 8.02827L12.6738 3.80518"
                    stroke="white"
                    strokeWidth="1.11165"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_1155_1322">
                    <rect width="17.7865" height="17.7865" fill="white" transform="translate(0.0742188 0.0991211)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Equipments;
