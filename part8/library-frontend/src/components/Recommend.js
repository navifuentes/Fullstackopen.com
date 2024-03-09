import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = () => {
  const resultUser = useQuery(ME);
  const resultBooks = useQuery(ALL_BOOKS);

  let user = {};
  let books = [];

  if (resultUser.loading || resultBooks.loading) {
    return <div>loading ...</div>;
  }
  user = resultUser.data.me;
  books = resultBooks.data.allBooks;

  const filterBooks = books.filter((b) =>
    b.genres.includes(user.favoriteGenre)
  );

  console.log("user", user);
  console.log("books", books);
  console.log("filterbooks", filterBooks);
  console.log(filterBooks.length);

  return (
    <div>
      <h2>recommendatios</h2>
      {filterBooks.length === 0 ? (
        <div>no matches for {user.favoriteGenre}</div>
      ) : (
        filterBooks.map((b) => <div key={b.id}>{b.title}</div>)
      )}
    </div>
  );
};

export default Recommend;
