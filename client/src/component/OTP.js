import { useState } from "react";
import { Button, Form } from "antd";
import { InputOTP } from "antd-input-otp";

const OTP = ({OTPValue}) => {

  const [form] = Form.useForm();

  const handleFinish = (values) => {
    // The value will be array of string
    // Join the array into a single string
    const { otp } = values;
    const otpString = otp.join(""); // Join array into a string
    const otpInteger = parseInt(otpString, 10); // Convert string to integer

    // Check if the otpString is valid
    if (isNaN(otpInteger) || otpString.length === 0) {
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP is invalid."],
        },
      ]);
    }
   OTPValue=otpInteger;
    console.log(`OTP: ${OTPValue}`);
  };

  return (
  
            <InputOTP autoFocus inputType="numeric" length={6} />

         


  );
};

export default OTP;
