import React, { Component } from 'react'
import AuthorViewer from './AuthorViewer'
import BookViewer from './BookViewer'
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Authors</h1>
        <AuthorViewer />
        <h1>Books</h1>
        <BookViewer />
    </div>
    )
  }
}

