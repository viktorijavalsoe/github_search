import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Form from '../components/Form';
import { StyledH1, StyledH2 } from '../style/typography';

const Heading = styled(StyledH1)`
  color: ${({ theme }): string => theme.primary};
`;

const SubHeading = styled(StyledH2)`
  color: ${({ theme }): string => theme.white};
`;

const StyledP = styled.p`
  color: ${({ theme }): string => theme.white};
  font-size: ${({ theme }): string => theme.fontSizes[0]};
`;

const StyledLink = styled.a`
  color: ${({ theme }): string => theme.primary};
  font-style: italic;
  text-decorations: none;
`;

const LandingPage = () => {
  const history = useHistory();

  const [token, setToken] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
    setToken(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    localStorage.setItem('token', token);
    history.push('/dashboard');
  }

  return (
    <BackgroundAnimation>
      <Heading>Welcome to GitHub Odessy</Heading>
      <SubHeading>Please enter your  GitHub Personal access token to start your journey.</SubHeading>
      <StyledP>
        Dont have one?
        {' '}
        <span>
          <StyledLink href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token" target="_blank" rel="noopener noreferrer">
            Follow this instructions to get one
          </StyledLink>
        </span>
      </StyledP>
      <Form token={token} handleChange={handleChange} handleSubmit={handleSubmit} />
    </BackgroundAnimation>

  );
};

export default LandingPage;
