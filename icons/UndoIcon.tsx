import React from "react";

export const UndoIcon = (props: React.SVGProps<SVGSVGElement> & { htmlColor?: string }) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clip-path="url(#clip0_19770_44922)">
    <path d="M12.5156 8.01562C14.7969 8.01562 16.8438 8.6875 18.6562 10.0312C20.4688 11.375 21.7344 13.1094 22.4531 15.2344L20.1094 15.9844C19.5781 14.3594 18.6094 13.0469 17.2031 12.0469C15.8281 11.0156 14.2656 10.5 12.5156 10.5C10.5781 10.5 8.85938 11.125 7.35938 12.375L11.0156 15.9844H2.01562V6.98438L5.57812 10.5938C7.54688 8.875 9.85938 8.01562 12.5156 8.01562Z" fill={props.htmlColor || "#888"}/>
    </g>
    <defs>
    <clipPath id="clip0_19770_44922">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>


  );
};

 