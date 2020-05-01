/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import ApolloClient, { NormalizedCacheObject, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Profile from '../Profile';


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


const DBConnection = () => {
  const token = localStorage.getItem('token');
  console.log(token);

  const client = createApolloClient(token);


  return (
    <ApolloProvider client={client}>
      <Profile />
    </ApolloProvider>
  );
};


export default DBConnection;
