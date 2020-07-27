import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen/Index";
import SearchScreen from "./Screens/SearchScreen/Index";
import * as BooksAPI from './BooksAPI';

class BooksApp extends Component {

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

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeScreen books={this.state.books} changeBookShelf={this.changeBookShelf}/>
            </Route>

            <Route exact path="/search">
              <SearchScreen books={this.state.books} changeBookShelf={this.changeBookShelf}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
