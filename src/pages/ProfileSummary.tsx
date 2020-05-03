import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import moment from 'moment';
import 'moment-timezone';

import styled from 'styled-components';

import { IUser } from '../interfaces/IUser';
import Form from '../components/Form';
import Chart from '../components/Chart';

const GET_PROFILE = gql`
query($userName: String!) { 
    search(query: $userName, type: USER, first: 10) {
    edges{
      node{
        ... on User{
          id
          bio
          createdAt
        
          repositories(first:100){
            totalCount
            edges{
              node{
                name
                languages(first:20){
                  edges{
                    node{
                      name
                      color
                    }
                  }
                }
              }
            }
          }
          contributionsCollection {
           contributionCalendar{
            totalContributions
            colors
            months{
              totalWeeks
            }
          }
          }
        }
      }
    }
  }
  }
`;

const ProfileSummary = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [loadResults, {
    called, loading, data, error,
  }] = useLazyQuery(GET_PROFILE, { variables: { userName } });

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
      <Form token={inputValue} handleChange={handleChange} handleSubmit={handleSubmit} />
      {called && loading && (<p>Loading ...</p>)}
      {data && (data.search.edges.map((user: IUser) => (
        <div key={user.node.id}>
          <p>
            {moment(user.node.createdAt)
              .tz('Europe/London')
              .format('YYYY')}
          </p>
          <p>{user.node.repositories.totalCount}</p>
          <Chart repositories={user.node.repositories.edges} totalCount={user.node.repositories.totalCount} />
        </div>
      )))}

    </>

  );
};

export default ProfileSummary;
