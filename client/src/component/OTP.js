import { useState } from "react";
import { Button, Form } from "antd";
import { InputOTP } from "antd-input-otp";

import "./styles.css";

const OTP = ({onSubmit,OTPValue,ResendCode}) => {
    window.addEventListener('load', () => {
        const overlay = document.querySelector('.OTP');
        overlay.classList.add('show');
      });
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
    <main className="OTP">
      <section className="cardOTP">
        <div className="verification_txt">
                <h2 className="Enter_Verification_Code_text">Enter Verification Code</h2>
                <p className="code_sent">we emailed you a six-digit code Enter the code bellow to confirme your email</p>  
        </div>
        <Form form={form} onFinish={handleFinish} style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
          <Form.Item
            name="otp"
            className="center-error-message"
            rules={[{ validator: async () => Promise.resolve() }]}
          >
            <InputOTP autoFocus inputType="numeric" length={6} />
          </Form.Item>
          <p className="didnt_receive_code2">didn't get a code<button className="didnt_receive_code" onClick={ResendCode}>Click to resend</button></p>

          <Form.Item  noStyle>
            <Button block htmlType="submit" type="primary" size="large"
             onClick={onSubmit}
             style={{
                maxWidth:"300px",  
            }}>
              Submit
            </Button>
          </Form.Item>
         

        </Form>
      </section>
    </main>
  );
};

export default OTP;
