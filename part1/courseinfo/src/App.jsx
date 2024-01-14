import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const StatisticLine = ({ value, text }) => (
  <p>
    {value}
    {text}
  </p>
);
const Statistics = ({ good, neutral, bad, total, average, positives }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine value={good} text=" good" />
      <StatisticLine value={neutral} text=" neutral" />
      <StatisticLine value={bad} text=" bad" />
      <StatisticLine value={total} text=" total" />
      <StatisticLine value={average} text=" average" />
      <StatisticLine value={positives} text=" % positive" />
    </>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positives = (good * 100) / total;
  return (
    <>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positives={positives}
      />
    </>
  );
};

export default App;
