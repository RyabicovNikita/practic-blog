import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(({ className, ...props }, ref) => (
  <input className={className} {...props} ref={ref} />
));
//auth__input

export const Input = styled(InputContainer)`
  font-family: "Renju";
  width: 100%;
  border: 0;
  padding: 0;
  border-bottom: 2px solid white;
  background-color: #00000000;
  font-size: 1em;
  padding-top: 1em;
`;