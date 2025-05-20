import React from "react";

interface ProfileIconProps {
    [key: string]: any;
}

const ProfileIcon: React.FC<ProfileIconProps> = (props) => {
    return (
        <svg width="11" height="15" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.3346 4.83333C10.3346 6.67428 8.84225 8.16667 7.0013 8.16667C5.16035 8.16667 3.66797 6.67428 3.66797 4.83333C3.66797 2.99238 5.16035 1.5 7.0013 1.5C8.84225 1.5 10.3346 2.99238 10.3346 4.83333Z"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.0013 10.6667C3.77964 10.6667 1.16797 13.2783 1.16797 16.5H12.8346C12.8346 13.2783 10.223 10.6667 7.0013 10.6667Z"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ProfileIcon;
