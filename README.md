README.md
Github Odyssey 

This is a simple search tool for Github. You can see github user profile summary, and search for repositories based on topic, and star repositories. 

It is buid with ReactJS in Typescript, using GitHub API v4, with the help of GraphQL queries. 
Apollo Client is used for handling data fetching and management. 
Application is deployed to Netlify and you can view live version here: 
https://compassionate-bhabha-8cf7b5.netlify.app/

To be able to use the application you need to generate a personal github token.
The description to how to can be found here:
https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token

The project features:
ReactJS
TypeScript
GraphQL
StyledComponents
ApolloClient
ESLint
Netlify

Installation

Make sure you have node installed along with npm.
From the root directory, run:

npm install

This will install all of the dependencies necessary to run and develop the project.
In order to start the development server:

npm start

Deployment and hosting

Deployment is made with the help of continous deployment from netlify. When code is pushed to master at origin an automatic build + deploy to production will happen.

The production environment can be found at https://compassionate-bhabha-8cf7b5.netlify.app/


Conventions
Make sure your editor can read the code styling of ESLint which is setup through an .eslintrc. The recommended approach is to setup your editor to be able to read this file. Also, when the development server is running, errors and warnings will be logged based on this configuration.

The CSS is written as styled components. 
