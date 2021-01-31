import styled from 'styled-components';
import React from 'react';
interface ButtonProps {
  type: 'submit'| 'type'| 'button';
  children: React.ReactNode;
}
const Button = styled.button<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: .5;
  }

  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

export default Button;
