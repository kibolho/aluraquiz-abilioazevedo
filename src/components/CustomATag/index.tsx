import Link from "../../../src/components/Link";
import styled from "styled-components";

export const CustomATag = styled(Link)`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;
  display: block;
  text-align: center;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;