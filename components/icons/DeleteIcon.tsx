import React from "react";

interface DeleteProps {
    [key: string]: any;
}

const DeleteIcon: React.FC<DeleteProps> = (props) => {
    return (
        <svg width="26" height="26" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3.53711 5.25586H4.80192H14.9204" stroke="#F43F5E" strokeWidth="1.28062" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M6.78845 5.26437V3.98375C6.78845 3.64411 6.91695 3.31838 7.14567 3.07821C7.3744 2.83805 7.68462 2.70313 8.00809 2.70312H10.4474C10.7708 2.70313 11.0811 2.83805 11.3098 3.07821C11.5385 3.31838 11.667 3.64411 11.667 3.98375V5.26437M13.4965 5.26437V14.2287C13.4965 14.5684 13.368 14.8941 13.1393 15.1343C12.9105 15.3745 12.6003 15.5094 12.2768 15.5094H6.17863C5.85516 15.5094 5.54494 15.3745 5.31621 15.1343C5.08748 14.8941 4.95898 14.5684 4.95898 14.2287V5.26437H13.4965Z"
                stroke="#F43F5E"
                strokeWidth="1.28062"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.80469 8.45508V12.0124" stroke="#F43F5E" strokeWidth="1.28062" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.6504 8.45508V12.0124" stroke="#F43F5E" strokeWidth="1.28062" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default DeleteIcon;
