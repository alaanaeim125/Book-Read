import React from "react";
import * as BooksAPI from "../../BooksAPI";
import "../../../src/App.css";
import { Link } from "react-router-dom";
import Book from "../../Components/Book";
class HomeScreen extends React.Component {
  // state books to store books when get all from api
  state = {
    books: [],
  };

  // function get all books
  getAllBooksFromApi = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  };

  // funtion to update shelf books
  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      var Books = [...this.state.books];
      var index = Books.findIndex(
        (originalBook) => originalBook.id === book.id
      );
      if (index >= 0) {
        Books[index].shelf = shelf;
      } else {
        book.shelf = shelf;
        Books.push(book);
      }
      this.setState({ books: Books });
    });
  };

  // lifeCycle to call function get all books after loading
  componentDidMount() {
    this.getAllBooksFromApi();
  }

  /*
   * Changed Redirect to page using state by using react router dom
   * and use Link to navigate to pages (search Screen)
   * @Naeeim
   */

  render() {
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
                    {this.state.books.length > 0 &&
                      this.state.books
                        .filter((book) => {
                          return book.shelf === "currentlyReading";
                        })
                        .map((book) => (
                          <li key={book.title}>
                            <Book
                              book={book}
                              changeBookShelf={this.changeBookShelf}
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
                    {this.state.books.length > 0 &&
                      this.state.books
                        .filter((book) => {
                          return book.shelf === "wantToRead";
                        })
                        .map((book) => (
                          <li key={book.title}>
                            <Book
                              book={book}
                              changeBookShelf={this.changeBookShelf}
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
                    {this.state.books.length > 0 &&
                      this.state.books
                        .filter((book) => {
                          return book.shelf === "read";
                        })
                        .map((book) => (
                          <li key={book.title}>
                            <Book
                              book={book}
                              changeBookShelf={this.changeBookShelf}
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
              to={{
                pathname: "/search",
                sendData: {
                  Books: this.state.books,
                  changeBookShelf: this.changeBookShelf,
                },
              }}
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
