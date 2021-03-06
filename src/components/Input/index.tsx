import React from "react";
import styled from "styled-components";

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-top: 12px;
  margin-bottom: 12px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.colors.contrastText}DD;
    opacity: 1; /* Firefox */
  }
`;
interface InputProps extends React.HTMLProps<HTMLInputElement> {
  onChange: (arg: any) => void;
}

const Input = React.forwardRef(
  ({ onChange, placeholder, value = "", ...props }: InputProps, ref) => {
    return (
      <div>
        <InputBase
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          ref={ref}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    );
  }
);

export default Input;
