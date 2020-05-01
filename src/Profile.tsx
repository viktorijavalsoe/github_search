/* eslint-disable no-nested-ternary */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const GET_USER_INFO = gql`
query { 
  viewer{
    name
    bio
  }}
`;


const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    console.log({ data });
  }

  return (
    <div>
      <p>{data.viewer.name}</p>
      <p>{data.viewer.bio}</p>
    </div>

  );
};


export default Profile;
