import React from "react";
import { useQuery } from "@apollo/client";
import { FILTER_BOOKS } from "../queries";

const FilterBooks = ({ books, genre, isFilter }) => {
  const genresResult = useQuery(FILTER_BOOKS, {
    variables: { genre },
  });

  let allFiltered = [];

  if (genresResult.loading) {
    return (
      <tr>
        <th>loading ....</th>
      </tr>
    );
  }

  if (!isFilter) {
    return books.map((b) => (
      <tr key={b.id}>
        <td>{b.title}</td>
        <td>{b.author.name}</td>
        <td>{b.published}</td>
      </tr>
    ));
  }

  allFiltered = genresResult.data.allBooks;
  return allFiltered.map((b) => (
    <tr key={b.id}>
      <td>{b.title}</td>
      <td>{b.author.name}</td>
      <td>{b.published}</td>
    </tr>
  ));
};

export default FilterBooks;
