import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <h1>Anecdote</h1>
      <p>{props.anecdote} has {props.vote} votes.</p>
    </div>
  )
}

const random = (arr) => {
  return Math.floor(Math.random() * arr.length)
}

const StatisticLine = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine text="All" value={props.all} />
      <StatisticLine text="Average" value={(props.good - props.bad) / props.all} />
      <StatisticLine text="Positive" value={props.good / props.all * 100} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes =
    [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]
  
  const index = random(anecdotes)
  const [anecdote, setAnecdote] = useState(anecdotes[index])
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  const trackVote = (ann) => {
    const copy = [...vote]
    copy[ann] += 1
    setVote(copy)
  }

  return (
    <div>
      <Anecdote anecdote={anecdote} vote={vote[index]}/>
      <Button handleClick={() => trackVote(index)} text="Vote" />
      <Button handleClick={() => setAnecdote(anecdotes[random(anecdotes)])} text="New Anecdote" />
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={good+bad+neutral}/>
    </div>
  )
}

export default App