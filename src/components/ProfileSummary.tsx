import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import moment from 'moment';
import 'moment-timezone';
import styled from 'styled-components';
import { StyledH1, StyledH2, StyledParagraph } from '../style/typography';
import { IUserSearch, IUser } from '../interfaces/IUser';
import Form from './Form';
import Chart from './Chart';
import StyledLink from './StyledLink';
import { GET_PROFILE } from '../utils/queries';


const Heading = styled(StyledH1)`
  color: ${({ theme }): string => theme.primary};
  text-align: center;
`;

const SubHeading = styled(StyledH2)`
  color: ${({ theme }): string => theme.white};
  text-align: center;
`;

const ImageContainer = styled.img`
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: ${({ theme }): string => theme.space[2]};
`;

const Container = styled.div`
  margin-top: ${({ theme }): string => theme.space[2]};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  ${(props): string => props.theme.xs`
	  flex-direction: column;
  `}
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }): string => theme.space[2]};;
`;

const ProfileSummary = () : JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [loadResults, {
    called, loading, data, error,
  }] = useLazyQuery<IUserSearch>(GET_PROFILE, { variables: { userName } });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    setUserName(inputValue);
    loadResults();
  }

  if (error) return <p> Error...</p>;
  return (
    <>
      <Heading>Githubber profile summary</Heading>
      <SubHeading>Search for fellow Githubber</SubHeading>
      <Form token={inputValue} handleChange={handleChange} handleSubmit={handleSubmit} />
      {called && loading && (<p>Loading ...</p>)}
      {data && (data.search.edges.map((user: IUser) => (
        <Container key={user.node.id}>
          <InfoContainer style={{ display: 'flex' }}>
            <ImageContainer src={user.node.avatarUrl} alt="avartar" />
            <div>
              <StyledParagraph>{user.node.name}</StyledParagraph>
              <StyledParagraph>
                Joined Github in
                {' '}
                {moment(user.node.createdAt)
                  .tz('Europe/London')
                  .format('YYYY')}
              </StyledParagraph>
              <StyledParagraph>
                Number of repositories
                {' '}
                {user.node.repositories.totalCount}
              </StyledParagraph>
              <StyledLink href={user.node.url}>View Profile</StyledLink>
            </div>
          </InfoContainer>
          <Chart repositories={user.node.repositories.edges} totalCount={user.node.repositories.totalCount} />
        </Container>
      )))}

    </>

  );
};

export default ProfileSummary;
