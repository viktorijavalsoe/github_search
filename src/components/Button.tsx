import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
  background-color: ${({ theme }): string => theme.highLight};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  border: none;
  color: white;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space[0]} 12px;
  margin: auto;
 
`;

interface IAppProps {
  text: string;
  handleSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const Button = ({ text, handleSubmit }: IAppProps): JSX.Element => (
  <StyledButton onClick={handleSubmit}>
    {text}
  </StyledButton>
);

export default Button;
