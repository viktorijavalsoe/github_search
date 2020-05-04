
import { gql } from 'apollo-boost';

export const SEARCH_REPOSITORY = gql`
query ($repoQuery: String!, $after: String){ 
  search(query: $repoQuery, type: REPOSITORY, first: 10, after: $after) {
    repositoryCount
    pageInfo{
      startCursor
      hasNextPage
      endCursor
    }
    edges {
      cursor
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

export const GET_PROFILE = gql`
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

export const STAR_REPO = gql`
mutation($repositoryId: ID!) {
  addStar(input:{starrableId:$repositoryId}) {
    starrable {
      viewerHasStarred
    }
  }
}
`;
