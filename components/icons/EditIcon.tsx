import React from "react";

interface EditProps {
    [key: string]: any;
}

const EditIcon: React.FC<EditProps> = (props) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.37836 3.12988H4.58392C4.23169 3.12988 3.8939 3.2698 3.64484 3.51886C3.39578 3.76792 3.25586 4.10572 3.25586 4.45794V13.7543C3.25586 14.1066 3.39578 14.4443 3.64484 14.6934C3.8939 14.9425 4.23169 15.0824 4.58392 15.0824H13.8803C14.2325 15.0824 14.5703 14.9425 14.8194 14.6934C15.0684 14.4443 15.2084 14.1066 15.2084 13.7543V9.95988"
                stroke="#667085"
                strokeWidth="1.17391"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.02 3.50552C13.2605 3.265 13.5867 3.12988 13.9269 3.12988C14.267 3.12988 14.5932 3.265 14.8337 3.50552C15.0743 3.74604 15.2094 4.07225 15.2094 4.4124C15.2094 4.75254 15.0743 5.07875 14.8337 5.31927L9.0902 11.0628L6.67188 11.6674L7.27646 9.24905L13.02 3.50552Z"
                stroke="#667085"
                strokeWidth="1.17391"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default EditIcon;
