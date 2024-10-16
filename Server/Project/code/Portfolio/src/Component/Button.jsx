import React from "react";
import styled from "styled-components";

const Button = ({ text }) => {
  return (
    <div className="text-white">
      <TextBtn>
        {text}
      </TextBtn>
    </div>
  );
};

export default Button;

const TextBtn = styled.button`
  background-color: #fca61f;
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border-radius: 9999px;
  border: none;
  &:hover {
    background-color: #6f34fe;
    transition: all 0.5s;
  }
`;
