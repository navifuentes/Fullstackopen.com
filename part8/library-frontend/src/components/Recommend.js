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
  console.log("user", user);
  console.log("books", books);

  return <div>Recommend</div>;
};

export default Recommend;
