import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { StyledH1, StyledH2 } from '../style/typography';


import Star from '../assets/star.png';
import Form from './Form';


const SEARCH_REPO = gql`
query ($repoQuery: String!){ 
  search(query: $repoQuery, type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository{
          name
          description
          id
          url
          watchers{
            totalCount
          }
          stargazers{
            totalCount
          }
         issues{
          totalCount
        }
          licenseInfo {
            conditions{
              description
            }
          }
          languages(first: 10){
            edges{
              node{
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

const Heading = styled(StyledH1)`
  color: ${({ theme }): string => theme.primary};
  text-align: center;
`;

const SubHeading = styled(StyledH2)`
  color: ${({ theme }): string => theme.white};
  text-align: center;
`;

const StarContainer = styled.div`
  width: 40px;
  text-align: center;
  p{
    color: ${({ theme }): string => theme.highLight};
    font-family: ${({ theme }): string => theme.fonts.heading};
  }
  img{
    width:100%;
  }
`;

const Details = styled.p`
  font-family: ${({ theme }): string => theme.fonts.heading};
  font-style: itallic;
  font-size: ${({ theme }): string => theme.fontSizes[3]};
  color: ${({ theme }): string => theme.white};
  text-align: center;
`;

const Underline = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }): string => theme.detail};
  margin: ${({ theme }): string => theme.space[3]} 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center; 
  h3{
    color: ${({ theme }): string => theme.accent};
    font-family: ${({ theme }): string => theme.fonts.heading};
    text-align: left;
    font-size: ${({ theme }): string => theme.fontSizes[5]};
    flex: 1;
    margin: 0;
  }
`;

interface ILanguage {
  name: string;
}

interface IRepositoryInfo {
  description: string;
  id: string;
  name: string;
  url: string;
  issues: {
    totalcount: number;
  },
  watchers: {
    totalCount: number
  },
  stargazers: {
    totalCount: number
  }
}

interface IRepository{
  node: IRepositoryInfo;
}

const RepositoryOverview = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [repoQuery, setRepoQuery] = useState<string>('');
  const [loadResults, {
    called, loading, data, error,
  }] = useLazyQuery(SEARCH_REPO, { variables: { repoQuery } });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    setRepoQuery(inputValue);
    loadResults();
  }


  if (error) return <p> Error...</p>;
  return (
    <div>
      <Heading>Search for repositories</Heading>
      <SubHeading>Explore GitHub universe and type in your search</SubHeading>
      <Form token={inputValue} handleChange={handleChange} handleSubmit={handleSubmit} />
      {called && loading && (<p>Loading ...</p>)}
      {data && (
        <>
          <Details>
            Results:
            {' '}
            {data.search.repositoryCount}
          </Details>

          <Underline />

          {data.search.edges.map((repository: IRepository) => (
            <div key={repository.node.id}>
              <Wrapper>
                <h3>{repository.node.name}</h3>
                <StarContainer>
                  <img src={Star} alt="star" />
                  <p>{repository.node.stargazers.totalCount}</p>
                </StarContainer>
              </Wrapper>
              <p>{repository.node.description}</p>
              <a href={repository.node.url} target="_blank" rel="noopener noreferrer">
                <p>View repository</p>
              </a>

              <Underline />
            </div>
          ))}
        </>
      )}

    </div>

  );
};

export default RepositoryOverview;
