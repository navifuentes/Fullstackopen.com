import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = () => {
  const [genreFilter, setGenreFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);
  let books = [];
  let genres = [];

  if (result.loading) {
    return <div>loading ...</div>;
  }
  books = result.data.allBooks;
  books.map((b) => {
    b.genres.map((g) => (!genres.includes(g) ? genres.push(g) : null));
  });

  const filterBooks = genreFilter
    ? books.filter((b) => b.genres.includes(genreFilter))
    : books;

  console.log(filterBooks);

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre:{" "}
        {!genreFilter ? <strong>all</strong> : <strong>{genreFilter}</strong>}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenreFilter(null)}>all</button>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
