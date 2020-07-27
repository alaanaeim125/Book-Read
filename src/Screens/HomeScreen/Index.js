import React from "react";
import "../../../src/App.css";
import { Link } from "react-router-dom";
import Book from "../../Components/Book";
class HomeScreen extends React.Component {

 
  render() {
    const { books, changeBookShelf} = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.length > 0 &&
                      books
                        .filter((book) => {
                          return book.shelf === "currentlyReading";
                        })
                        .map((book) => (
                          <li key={book.title}>
                            <Book
                              book={book}
                              changeBookShelf={changeBookShelf}
                            />
                          </li>
                        ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.length > 0 &&
                      books
                        .filter((book) => {
                          return book.shelf === "wantToRead";
                        })
                        .map((book) => (
                          <li key={book.title}>
                            <Book
                              book={book}
                              changeBookShelf={changeBookShelf}
                            />
                          </li>
                        ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.length > 0 &&
                      books
                        .filter((book) => {
                          return book.shelf === "read";
                        })
                        .map((book) => (
                          <li key={book.title}>
                            <Book
                              book={book}
                              changeBookShelf={changeBookShelf}
                            />
                          </li>
                        ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            {/*
             * use Link to redirect search page
             * and send data
             * send books
             * send function change book shelf
             */}
            <Link
              to="/search"
            >
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeScreen;
