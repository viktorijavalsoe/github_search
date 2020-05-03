/* eslint-disable max-len */
import React, { ReactNode } from 'react';
import ApolloClient, { NormalizedCacheObject, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components';
import Header from './Header';


// DB connection
const createApolloClient = (authToken: string | undefined | null) : ApolloClient<NormalizedCacheObject> => new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }
    if (networkError && networkError.message.includes('401')) {
      console.log(`%c [Network error]: ${networkError}`, 'color:red');
    }
  },
  cache: new InMemoryCache(),
});


const MainContainer = styled.div`
  padding: ${({ theme }): string => theme.space[1]};
  background-color: ${({ theme }): string => theme.background};
  max-width: 960px;
  margin: 0 auto;
  
`;


const Layout = ({ children }: {children: ReactNode}): JSX.Element => {
  const token = localStorage.getItem('token');
  const client = createApolloClient(token);
  return (
    <ApolloProvider client={client}>
      <Header />
      <MainContainer>
        {children}
      </MainContainer>
    </ApolloProvider>
  );
};

export default Layout;
