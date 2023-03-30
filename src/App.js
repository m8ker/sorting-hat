import React, { Component } from 'react';

import Quiz from './components/Quiz';
import Questions from './api/Questions'
import Result from './components/Result'
// import Back from './components/Back';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        Manage: 0,
        Design: 0,
        Build: 0
      },
      result: ''
    };
  }

  handleClick = () => {
    document.querySelectorAll(".hide").forEach( e => e.classList.remove("hide"));
    document.querySelectorAll(".hide-toggle").forEach( e => e.classList.add("hide"));
  }

  UNSAFE_componentWillMount = () => {
    const shuffledAnswerOptions = Questions.map((question) => this.shuffleArray(question.answers)); // Setting new random order of possible answer array by calling shuffle function

    this.setState({
      question: Questions[0].question, // Setting first question -- Displaying first question from Question data array
      answerOptions: shuffledAnswerOptions[0] // Setting first answers -- Displaying first question's posisble answers randomly from Question data array 
    });
  }

  shuffleArray = (array) => { // Shuffle function being called
    let currentIndex = array.length, temporaryValue, randomIndex; // Setting current index from answer option length (4) and other variables

    while (0 !== currentIndex) { // Will continue so long as there are still items in the array. (First index of 4 then --)
      randomIndex = Math.floor(Math.random() * currentIndex); // Set random new index (ex. 2)
      currentIndex -= 1; // Current index now 3
      temporaryValue = array[currentIndex]; // Value set to array[3] or third answer option
      array[currentIndex] = array[randomIndex]; // array[3] = array[2]
      array[randomIndex] = temporaryValue; // array[2] = array [3] :: This is essentially swapping to answer option positions using third variable
    } // Process continues for each index (4 times)

    return array; // return new random array
  }

  setUserAnswer = (answer) => { // for each selected answer new state to be added
    this.setState((state) => ({
      answersCount: { // setting new state of answersCount object containing key (house) and values (current score)
        ...state.answersCount, // utilizing previus state
        [answer]: state.answersCount[answer] + 1 // taking the key that matches the selected answer and adding 1 to its value
      },
      answer: answer // answer previously empty string now the selected answer
    }));
  }

  setNextQuestion = () => {
    console.log("next" + this.state.counter);
    const counter = this.state.counter + 1; // Counter starts at zero and increments by one each question (counter = 0)
    const questionId = this.state.questionId + 1; // Start at 1 (Question 1) and increments by one (id =1)
    this.setState({
      counter: counter, // return new counter (counter = 1)
      questionId: questionId, // return new id (id = 2)
      question: Questions[counter].question, // replace last question with next one from Question data array (question = Questions[1].question)
      answerOptions: Questions[counter].answers, // replace last answer options with next one from Question data array
      answer: '' // resetting selected answer
    });
  }


  handleAnswerSelected = (e) => { // called when answer is selected
    this.setUserAnswer(e.currentTarget.value); // calling setUserAnswer function with selected answer
    if (this.state.questionId < Questions.length) { // continue for all items in Question Array
        setTimeout(() => this.setNextQuestion(), 100); // calling setNextQUestion function after given time
      } else { // return once all questions answered
        setTimeout(() => this.setResults(this.getResults()), 100); // calling setResults function after given time using the results from the called getResults function
      }
  }

  getResults = () => { // to determine result
    const answersCount = this.state.answersCount; // setting answer object of current state (exObj= {H: 5, G: 1, R: 1})
    const answersCountKeys = Object.keys(answersCount); // setting key array from answer object (exArr= [H, G, R])
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]); // iterate over key array and set value array to be the answer object value at that key index (exVals = [5, 1, 1])
    const maxAnswerCount = Math.max(...answersCountValues); // spread operator to get max number from array (ex. 5)
    
    console.log("answersCountKeys " + answersCountKeys);
    console.log("answersCountValues " + answersCountValues);
    console.log("maxAnswerCount " + maxAnswerCount);
    
    const answerCountResult = answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount); // returns answer object item who has max (exResult. [H] : exObg[H] = 5)
    console.log("answerCountResult " + answerCountResult);
    return answerCountResult;
  }

  setResults = (result) => { // takes in calculated result array (ex. [H])
    console.log("length of result is " + result.length)
    if (result.length === 1) { // if only one max value in array 
      //console.log(result);
      this.setState({ result: result[0] }); // returns only item (ex. H)
    } else { // if more than one max value like a tie (ex. [H, G, S])
      console.log("before set state " + result);
      this.setState({ result: result[Math.floor(Math.random() * result.length)]}); // returns result at random index (ex. length=3 => random index expected 0, 1, or 2)
      //this.setState({ result: result[0] });
      console.log("after set state " + result);
      // this.setState({ result: result[0] });
    }
  }

  renderQuiz = () => {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={Questions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult = () => {
    return (
      <Result quizResult={this.state.result} />
    );
  }

  render() {
    return (
      <div className="App">

        <div className="hide-toggle App-section">
          <div className="intro-bg">
          <button className="find-your-fit btn btn-secondary btn-lg" onClick={this.handleClick}>Quiz</button>
          </div>
        </div>

        <div className="hide">
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      </div>
    );
  }
}

export default App;
