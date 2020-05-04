import React from 'react';
import styled from 'styled-components';

const StyledLinkWrapper = styled.a`
  color: ${({ theme }): string => theme.primary};
  font-style: italic;
  text-decorations: none;
  font-size: ${({ theme }): string => theme.fontSizes[1]};
  &:hover {
    color: ${({ theme }): string => theme.highLight};
  }
`;

interface IStyledLink {
  children: React.ReactNode;
  href: string;
}

const StyledLink = ({ href, children }: IStyledLink): JSX.Element => (
  <StyledLinkWrapper href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </StyledLinkWrapper>
);

export default StyledLink;
