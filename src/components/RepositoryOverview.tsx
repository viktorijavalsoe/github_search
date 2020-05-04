import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { StyledH1, StyledH2 } from '../style/typography';
// eslint-disable-next-line import/named
import { SEARCH_REPOSITORY, STAR_REPO } from '../utils/queries';
import Form from './Form';
import { IRepository, ISearch } from '../interfaces/IRepository';
import Button from './Button';
import Card from './Card';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
`;

const Heading = styled(StyledH1)`
  color: ${({ theme }): string => theme.primary};
  text-align: center;
`;

const SubHeading = styled(StyledH2)`
  color: ${({ theme }): string => theme.white};
  text-align: center;
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


const RepositoryOverview = () : JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [repoQuery, setRepoQuery] = useState<string>('');
  const [cursor, setCursor] = useState<string>('');
  const [isNextPage, setIsNextPage] = useState<boolean>(false);

  const [loadResults, {
    called, loading, data, error, fetchMore,
  }] = useLazyQuery<ISearch>(SEARCH_REPOSITORY, { variables: { repoQuery } });

  const [starRepository] = useMutation(STAR_REPO);

  function handleAddRepo(id:string): Promise<any> {
    return starRepository({
      variables: { repositoryId: id },
    });
  }

  useEffect(() => {
    if (data) {
      setIsNextPage(data.search.pageInfo.hasNextPage);
      setCursor(data.search.pageInfo.startCursor);
    }
  }, [data]);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>):void{
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
    e.preventDefault();
    setRepoQuery(inputValue);
    loadResults();
  }

  function loadMoreResults(): void{
    fetchMore({
      variables: {
        after: cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          search: {
            ...fetchMoreResult.search,
            edges: [
              ...prev.search.edges,
              ...fetchMoreResult.search.edges,
            ],
          },
        };
      },
    });
  }


  if (error) return <p> Error...</p>;
  return (
    <MainWrapper>
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
          <Card repository={repository} handleAddRepo={handleAddRepo} />
        ))}
        {isNextPage && (
        <Button text="Load more" handleSubmit={loadMoreResults} />
        )}
      </>
      )}


    </MainWrapper>

  );
};

export default RepositoryOverview;
