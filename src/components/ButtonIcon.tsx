import React from 'react';
import styled from 'styled-components';
import StarIcon from './StarIcon';


const AddButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  color: ${({ theme }): string => theme.highLight};
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  padding: 0;
  svg{
    margin-right: ${({ theme }) => theme.space[0]};
  }
`;

interface IAppProps {
  text: string;
  starred: boolean;
  handleSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const ButtonIcon = ({ text, handleSubmit, starred }: IAppProps): JSX.Element => (
  <AddButton onClick={handleSubmit}>
    <StarIcon height="20px" fill={starred ? '#F8DE92' : '#FFFFFF'} />

    {text}
  </AddButton>
);

export default ButtonIcon;
