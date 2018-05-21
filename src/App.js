import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import './App.css';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      repositories(first: 20) {
        edges {
          node {
            id
            name
            url
            viewerHasStarred
          }
        }
      }
    }
  }
`;

const App = () => (
  <Query query={GET_REPOSITORIES_OF_ORGANIZATION}>
    {({ data: { organization }, loading }) => {
      if (loading || !organization) {
        return <div>Loading ...</div>;
      }

      return (
        <RepositoryList repositories={organization.repositories} />
      );
    }}
  </Query>
);

const RepositoryList = ({ repositories }) => (
  <ul>
    {repositories.edges.map(({ node }) => {
      return (
        <li key={node.id}>
          <a href={node.url}>{node.name}</a>
        </li>
      );
    })}
  </ul>
);

export default App;
