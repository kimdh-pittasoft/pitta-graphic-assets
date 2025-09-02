import * as React from "react"

export const FullScreenExitIcon = (props: React.SVGProps<SVGSVGElement> & { htmlColor?: string }) => {
  return (

<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill={props.htmlColor || "#888"} {...props}><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>


  );
};
