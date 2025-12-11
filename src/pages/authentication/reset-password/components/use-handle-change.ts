import React from 'react';

const useHandleChange = (e: React.ChangeEvent<HTMLInputElement>,setOtpValue:any,otpValue:any) => {
    const { maxLength, value, name } = e.target;
    const [,fieldIndex] = name.split("-");

    if (value?.length >= maxLength) {
      if (parseInt(fieldIndex, 10) < 6) {
        const nextSibling: HTMLElement | null = document.querySelector(
          `input[name=otp-${parseInt(fieldIndex, 10) + 1}]`
        );
        if (nextSibling !== null) {
          nextSibling?.focus();
        }
      }
    }

    setOtpValue({
      ...otpValue,
      [`otp${fieldIndex}`]: value[value?.length - 1],
      
    });
  };

  export default useHandleChange;