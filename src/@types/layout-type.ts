import React from "react";

export type LAYOUT_TYPE = {
  title?:string,
    children:any,
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
    onBack?: () => void,
    activeIndex: number,
    progressData: {
      about_business: number;
      payout: number;
      stake: number;
     },
  isSubmited: boolean
  }
