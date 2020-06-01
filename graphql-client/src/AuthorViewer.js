import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';

export const GET_AUTHORS = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

export default () => (
  <Query query={GET_AUTHORS}>
    {({ loading, data }) => !loading && (
      <table className="table striped bordered hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.authors.map(author => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Query>
);