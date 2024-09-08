import { useState } from "react";
import { Button, Form } from "antd";
import { InputOTP } from "antd-input-otp";

const OTP = ({handleFinish}) => {

  const [form] = Form.useForm();


  return (
  
    <Form onFinish={handleFinish} form={form}>
    <Form.Item  name="otp">
      <InputOTP autoSubmit={form} inputType="numeric" />
    </Form.Item>
    </Form>

         


  );
};

export default OTP;
