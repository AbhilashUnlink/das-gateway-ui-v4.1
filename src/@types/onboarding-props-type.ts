import React from "react";

export type  ONBOARDING_PROPS_TYPE ={
    onNext: () => void,
    onBack?: () => void,
    onChange?: (key?: any, value?: any) => void,
    onSave: (key: string, value: any) => Promise<void>,
    setPayload?: any,
    payload?: any,
    progressData?: {
      about_business?: number;
      payout?: number;
      stake?: number;
    },
    onChangeProgress?: (key?: any, allValues?: any) => void
  }
