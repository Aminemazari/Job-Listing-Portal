import React, { useState } from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import style from "./style.module.css";

const InputPassword = ({ inputValue, onInputChange, Status }) => {
  const [input, setInput] = useState(inputValue || '');
  const [validationError, setValidationError] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase.test(password)) {
      return 'Password must contain at least 1 uppercase letter.';
    }
    if (!hasNumber.test(password)) {
      return 'Password must contain at least 1 number.';
    }
    if (!hasSymbol.test(password)) {
      return 'Password must contain at least 1 symbol.';
    }
    return ''; // No errors
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    setValidationError(validatePassword(newValue));

    if (typeof onInputChange === 'function') {
      onInputChange(newValue);
    }
  };

  return (
    <>
      <Input.Password
        placeholder="Password"
        className={style.input_ant}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={input}
        onChange={handleInputChange}
        status={validationError ? 'error' : Status}
      />
      {validationError && (
        <div className={style.validationError}>
          {validationError}
        </div>
      )}
    </>
  );
};

export default InputPassword;
