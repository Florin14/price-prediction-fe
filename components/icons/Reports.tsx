import React from "react";

interface ReportsProps {
    [key: string]: any;
}

const Reports: React.FC<ReportsProps> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_1155_1295)">
                <path
                    d="M5.7465 3.12988H4.31173C3.9312 3.12988 3.56626 3.28105 3.29719 3.55012C3.02812 3.81919 2.87695 4.18413 2.87695 4.56466V13.1733C2.87695 13.5538 3.02812 13.9188 3.29719 14.1878C3.56626 14.4569 3.9312 14.6081 4.31173 14.6081H11.4856C11.8661 14.6081 12.2311 14.4569 12.5001 14.1878C12.7692 13.9188 12.9204 13.5538 12.9204 13.1733V4.56466C12.9204 4.18413 12.7692 3.81919 12.5001 3.55012C12.2311 3.28105 11.8661 3.12988 11.4856 3.12988H10.0508"
                    stroke="white"
                    strokeWidth="1.17391"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.6176 1.69482H7.18282C6.39042 1.69482 5.74805 2.33719 5.74805 3.1296C5.74805 3.922 6.39042 4.56437 7.18282 4.56437H8.6176C9.41 4.56437 10.0524 3.922 10.0524 3.1296C10.0524 2.33719 9.41 1.69482 8.6176 1.69482Z"
                    stroke="white"
                    strokeWidth="1.17391"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M5.74805 11.7383V8.15137" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.90039 11.7384V11.021" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.0527 11.7381V9.58594" stroke="white" strokeWidth="1.17391" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1155_1295">
                    <rect width="15.6521" height="15.6521" fill="white" transform="translate(0.0742188 0.325195)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Reports;
