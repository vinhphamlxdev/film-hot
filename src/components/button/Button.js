import { LoadingSpinner } from "../loading";
import React from "react";
import styled from "styled-components";

const ButtonStyles = styled.button`
  cursor: pointer;
  margin-top: 25px;
  height: 52px;
  padding: 16px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00bbf9;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
