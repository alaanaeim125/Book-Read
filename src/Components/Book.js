import React from "react";
import "../../src/App.css";

const Book = (props) => {
  const { book, shelf, changeBookShelf } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${
              book.imageLinks ? book.imageLinks.thumbnail : null
            }")`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf ? book.shelf : shelf}
            onChange={(e) => changeBookShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors
          ? book.authors.map((author) => (
              <div key={author}>
                {author}
                <br />
              </div>
            ))
          : "No Author"}
      </div>
    </div>
  );
};

export default Book;
