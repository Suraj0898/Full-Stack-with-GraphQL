import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';

export const GET_BOOKS = gql`
  {
    books {
      id
      name
      pages
    }
  }
`;

export default () => (
  <Query query={GET_BOOKS}>
    {({ loading, data }) => !loading && (
      <table className="table striped bordered hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pages</th>
          </tr>
        </thead>
        <tbody>
          {data.books.map(book => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.pages}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </Query>
);