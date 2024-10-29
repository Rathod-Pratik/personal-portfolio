import styled from "styled-components"

export const Button = styled.button`
  display: flex;
  padding: 1.5625rem;
  background-color: black;
  color: white;
  align-items: center;
  justify-content: center;
  border-radius: 0.3125rem;
  width: 13.75rem;
  height: 2.75rem;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.25s ease-in;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
    transition: all ease-in 0.25s;
  }
  `;

  export const OutlineButton=styled(Button)`
  background: white;
  color: black;
  border:1px solid black;
  &:hover {
    background-color: black;
    color: white;
    border: transparent;
    transition: all ease-in 0.25s;
  }
  `