import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BackgroundImage from '../assets/background.png';
import { DASHBOARD, PROFILE_SUMMARY } from '../utils/urlRoutes';

const NavigationWrapper = styled.div<{open: boolean}>`
    display: flex;
    flex-direction: column;
    background: url(${BackgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    position: absolute;
    left: 0;
    transition: transform 0.5s ease-in-out;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-200%)')};
    width: 100%;
`;
const LinkCointainer = styled.div`
  display: flex;
  flex-direction: column;
  margin:  ${({ theme }) => theme.space[6]} auto; 
  text-align: center;
    & > * {
        padding: ${({ theme }) => theme.space[0]};
        color: ${({ theme }): string => theme.primary};
        font-family: ${({ theme }) => theme.fonts.heading};
        font-size: ${({ theme }) => theme.fontSizes[4]};
        text-decoration: none;
        &:hover {
          color: ${({ theme }): string => theme.highLight};
        }
    }
`;

const ImageContainer = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  margin: ${({ theme }) => theme.space[4]}  auto;
`;

interface IDropdown {
  open : boolean;
  avatar : string;
  setOpen: ((open: boolean)=> void)
}

const Dropdown = ({ open, avatar, setOpen } : IDropdown) : JSX.Element => (
  <NavigationWrapper open={open}>
    <LinkCointainer>
      <ImageContainer src={avatar} alt="avatar" />
      <Link to={DASHBOARD.path} onClick={() => setOpen(!open)}>Explore repository</Link>
      <Link to={PROFILE_SUMMARY.path} onClick={() => setOpen(!open)}>Find a githubber</Link>
    </LinkCointainer>

  </NavigationWrapper>
);

export default Dropdown;
