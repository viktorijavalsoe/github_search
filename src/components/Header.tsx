import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import BackgroundImage from '../assets/background.png';


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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }): string => theme.space[0]};
  p{
    color: white;
    text-transform: capitalize;
  }
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: ${({ theme }): string => theme.space[2]};
  `;


const Header = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <Redirect to="/" />;
  return (
    <HeaderContainer>
      <p>{data.viewer.name}</p>
      <Avatar src={data.viewer.avatarUrl} alt="avatar" />
    </HeaderContainer>
  );
};

export default Header;
