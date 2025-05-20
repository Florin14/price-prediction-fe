import React from "react";

interface InvoicesProps {
    [key: string]: any;
}

const Invoices: React.FC<InvoicesProps> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_1155_1280)">
                <path
                    d="M9.20508 2.67285V5.28153C9.20508 5.4545 9.27379 5.62038 9.39609 5.74269C9.5184 5.86499 9.68428 5.9337 9.85725 5.9337H12.4659"
                    stroke="white"
                    strokeWidth="1.17391"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.16 14.4119H4.63832C4.29239 14.4119 3.96063 14.2745 3.71602 14.0299C3.47141 13.7853 3.33398 13.4535 3.33398 13.1076V3.97719C3.33398 3.63126 3.47141 3.2995 3.71602 3.05488C3.96063 2.81027 4.29239 2.67285 4.63832 2.67285H9.20352L12.4644 5.9337V13.1076C12.4644 13.4535 12.3269 13.7853 12.0823 14.0299C11.8377 14.2745 11.506 14.4119 11.16 14.4119Z"
                    stroke="white"
                    strokeWidth="1.17391"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M5.94531 6.58594H6.59748" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.94531 9.19482H9.85833" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.94531 11.8037H9.85833" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1155_1280">
                    <rect width="15.6521" height="15.6521" fill="white" transform="translate(0.0742188 0.716797)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Invoices;
