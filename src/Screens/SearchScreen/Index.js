import React from "react";
import { Link } from "react-router-dom";
import Book from "../../Components/Book";
import * as BooksAPI from "../../BooksAPI";

class SearchScreen extends React.Component {
  state = {
    QueryValue: "",
    BooksFilter: [],
    error: false,
  };

  makeQueryToFilter = (query) => {
    if (query === "" || query === undefined) {
      this.setState({ QueryValue: "", BooksFilter: [], error: true });
    } else {
      this.setState({ QueryValue: query });
    }
    this.makeFilterBooks(query);
  };

  makeFilterBooks = (query) => {
    let queryPure = query.trim();
    BooksAPI.search(queryPure).then((res) => {
      if (res === undefined ||
        (res.error && res.error === "empty query")) {
        this.setState({ BooksFilter: [], error: true });
      } else {
        this.setState({
          BooksFilter: this.makeUpdateOnBooks(res),
          error: false,
        });
      }
    });
  };

  makeUpdateOnBooks = (result) => {
    this.props.books.forEach((book) => {
      const bookIndex = result.findIndex(
        (searchBook) => searchBook.id === book.id
      );
      if (bookIndex >= 0) {
        result[bookIndex].shelf = book.shelf;
      }
    });

    return result;
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.QueryValue}
              onChange={(e) => this.makeQueryToFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!this.state.error && (
            <div className="error">
              <h3 style={{ textAlign: "center" }}>
                {this.state.BooksFilter.length} Result Match
              </h3>
            </div>
          )}

          {this.state.error && (
            <div className="error">
              <h4 style={{ textAlign: "center", color: "red" }}>
                Warnning: Please Type Valid KeyWord To Search on Book .
              </h4>
            </div>
          )}
        </div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.BooksFilter.map((book, index) => (
              <li key={index}>
                <Book
                  book={book}
                  shelf="none"
                  changeBookShelf={this.props.changeBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchScreen;
