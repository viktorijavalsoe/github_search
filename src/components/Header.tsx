import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import BackgroundImage from '../assets/background.png';
import Logo from '../assets/logo.png';
import { LANDING_PAGE } from '../utils/urlRoutes';
import Hamburger from './Hamburger';
import Dropdown from './Dropdown';


const GET_USER_INFO = gql`
  query { 
    viewer{
      name
      bio
      avatarUrl
    }
  }
`;

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background: url(${BackgroundImage});
  background-color: ${({ theme }): string => theme.background};
  padding: ${({ theme }): string => theme.space[1]};
`;

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LogoContainer = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const Header = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);

  const [open, setOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Loading...</p>;
  return (
    <HeaderContainer>
      <NavigationContainer>
        <Link to={LANDING_PAGE.path}>
          <LogoContainer src={Logo} alt="logo" />
        </Link>
        <Hamburger open={open} setOpen={setOpen} />
      </NavigationContainer>
      <Dropdown open={open} avatar={data.viewer.avatarUrl} setOpen={setOpen} />

    </HeaderContainer>
  );
};

export default Header;
