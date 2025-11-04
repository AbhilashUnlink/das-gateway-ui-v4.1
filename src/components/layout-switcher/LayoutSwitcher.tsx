import { useState } from "react";

const LayoutSwitcher = () => {
    const [isActive, setIsActive] = useState(false);

  const handleSvgClick = () => {
    setIsActive((prev) => !prev);
    window.open("https://dev.paymentoptions.com/", "_blank"); // open in new tab
  };
  return (
    <div className="layout-switcher">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleSvgClick}
        className={isActive ? "svg-icon active" : "svg-icon"}
        style={{ cursor: "pointer" }}
      >
        <rect width="24" height="24" rx="12" fill="#D3CABA" />
        <path
          d="M12 16.3333C14.3932 16.3333 16.3333 14.3932 16.3333 12C16.3333 9.60676 14.3932 7.66666 12 7.66666C9.60673 7.66666 7.66663 9.60676 7.66663 12C7.66663 14.3932 9.60673 16.3333 12 16.3333Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.76 16.76L16.6734 16.6733M16.6734 7.32667L16.76 7.24L16.6734 7.32667ZM7.24004 16.76L7.32671 16.6733L7.24004 16.76ZM12 5.38667V5.33334V5.38667ZM12 18.6667V18.6133V18.6667ZM5.38671 12H5.33337H5.38671ZM18.6667 12H18.6134H18.6667ZM7.32671 7.32667L7.24004 7.24L7.32671 7.32667Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LayoutSwitcher;
