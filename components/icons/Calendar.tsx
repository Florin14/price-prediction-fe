import React from "react";

interface CalendarProps {
    [key: string]: any;
}

const Calendar: React.FC<CalendarProps> = (props) => {
    // Destructure and filter out ownerState prop to avoid React warnings
    const { ownerState, ...svgProps } = props;

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
            <path d="M7.70422 1.92578V4.81486" stroke="#667085" strokeWidth="1.6509" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.4084 1.92578V4.81486" stroke="#667085" strokeWidth="1.6509" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.37061 8.75391H19.7421" stroke="#667085" strokeWidth="1.6509" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M20.2235 8.18623V16.372C20.2235 19.261 18.779 21.1871 15.4084 21.1871H7.70417C4.33358 21.1871 2.88904 19.261 2.88904 16.372V8.18623C2.88904 5.29715 4.33358 3.37109 7.70417 3.37109H15.4084C18.779 3.37109 20.2235 5.29715 20.2235 8.18623Z"
                stroke="#667085"
                strokeWidth="1.6509"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M15.1144 13.1925H15.1231" stroke="#667085" strokeWidth="1.6509" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.1144 16.0831H15.1231" stroke="#667085" strokeWidth="1.6509" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.552 13.1925H11.5607" stroke="#667085" strokeWidth="1.6509" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.552 16.0831H11.5607" stroke="#667085" strokeWidth="1.6509" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.98758 13.1925H7.99623" stroke="#667085" strokeWidth="1.6509" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.98758 16.0831H7.99623" stroke="#667085" strokeWidth="1.6509" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Calendar;
