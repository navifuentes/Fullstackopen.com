import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Display = ({ count }) => <p>has {count} votes</p>;
const Title = ({ text }) => <h2>{text}</h2>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const [selected, setSelected] = useState(0);
  const [indexOfLargest, setIndexOfLargest] = useState(0);

  const copy = [...votes];

  const findLargest = (arr) => {
    let copyArr = [...arr];
    let largest = 0;
    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i] > largest) {
        largest = copyArr[i];
        setIndexOfLargest(copyArr.indexOf(largest));
      }
    }
  };

  return (
    <>
      <Title text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Display count={votes[selected]} />
      <Button
        handleClick={() => {
          setSelected(Math.floor(Math.random() * anecdotes.length));
        }}
        text="next anecdote"
      />
      <Button
        handleClick={() => {
          copy[selected] += 1;
          setVotes(copy);
          findLargest(copy);
        }}
        text="vote"
      />
      <p>{anecdotes[indexOfLargest]}</p>
    </>
  );
};
export default App;
