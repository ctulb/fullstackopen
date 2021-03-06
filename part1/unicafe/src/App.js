import React, { useState } from 'react';

const Header = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  );
};

const Button = ({ name, handler }) => {
  return (
    <button name={name} onClick={handler}>
      {name}
    </button>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={good + neutral + bad} />
            <Statistic
              text="average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <Statistic
              text="positive"
              value={(good / (good + neutral + bad)) * 100 + '%'}
            />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <Header />
      <div>
        <Button name="good" handler={handleGoodClick} />
        <Button name="neutral" handler={handleNeutralClick} />
        <Button name="bad" handler={handleBadClick} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
