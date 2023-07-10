import React, { FC } from "react";

interface LogoutIconProps {
  size?: number;
  color?: string;
}

const LogoutIcon: FC<LogoutIconProps> = ({ size, color }) => (
  <svg
    style={{
      width: size ? `${size}%` : "100%",
      height: "auto",
    }}
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Iconly/Bold/Logout</title>
    <g
      id="Iconly/Bold/Logout"
      stroke="none"
      stroke-width="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Logout"
        transform="translate(2.000000, 2.000000)"
        fill={color}
        fillRule="nonzero"
      >
        <path d="M9.49273256,0 C11.9752907,0 14,1.99 14,4.44 L14,4.44 L14,9.23 L7.89534884,9.23 C7.45784884,9.23 7.1119186,9.57 7.1119186,10 C7.1119186,10.42 7.45784884,10.77 7.89534884,10.77 L7.89534884,10.77 L14,10.77 L14,15.55 C14,18 11.9752907,20 9.47238372,20 L9.47238372,20 L4.51744186,20 C2.0247093,20 -1.42108547e-14,18.01 -1.42108547e-14,15.56 L-1.42108547e-14,15.56 L-1.42108547e-14,4.45 C-1.42108547e-14,1.99 2.03488372,0 4.52761628,0 L4.52761628,0 Z M16.5402,6.5502 C16.8402,6.2402 17.3302,6.2402 17.6302,6.5402 L17.6302,6.5402 L20.5502,9.4502 C20.7002,9.6002 20.7802,9.7902 20.7802,10.0002 C20.7802,10.2002 20.7002,10.4002 20.5502,10.5402 L20.5502,10.5402 L17.6302,13.4502 C17.4802,13.6002 17.2802,13.6802 17.0902,13.6802 C16.8902,13.6802 16.6902,13.6002 16.5402,13.4502 C16.2402,13.1502 16.2402,12.6602 16.5402,12.3602 L16.5402,12.3602 L18.1402,10.7702 L14.0002,10.7702 L14.0002,9.2302 L18.1402,9.2302 L16.5402,7.6402 C16.2402,7.3402 16.2402,6.8502 16.5402,6.5502 Z"></path>
      </g>
    </g>
  </svg>
);

export default LogoutIcon;
