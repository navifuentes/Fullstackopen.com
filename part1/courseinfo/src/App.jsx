import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Display = ({ value, text }) => (
  <p>
    {value}
    {text}
  </p>
);
const ConditionDisplay = ({ value, text }) => {
  if (!value) {
    return <p>no feedback given</p>;
  }
  return (
    <p>
      {value}
      {text}
    </p>
  );
};
const Statistics = ({ good, neutral, bad, total, average, positives }) => {
  return (
    <>
      <h2>Statistics</h2>
      <Display value={good} text=" good" />
      <Display value={neutral} text=" neutral" />
      <Display value={bad} text=" bad" />
      <Display value={total} text=" total" />
      <ConditionDisplay value={average} text=" average" />
      <ConditionDisplay value={positives} text=" % positive" />
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
