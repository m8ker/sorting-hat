import React from 'react';
import Answer from '../components/Answer';


const Quiz = (props) => {
    const renderAnswerOptions = (key) => {
        return (
          <Answer
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={props.answer}
            questionId={props.questionId}
            onAnswerSelected={props.onAnswerSelected}
          />
        );
    }


    return (
        <div className="quiz">
            
            <div className="orientation px-4 py-2">Question <span>{props.questionId}</span> of <span>{props.questionTotal}</span></div>
           
            <div className="App-section">
               
                <p className="question">{props.question}</p>
                <ul className="answerOptions mt-4">
                    {props.answerOptions.map(renderAnswerOptions)}
                </ul>
                
            </div>
            
        </div>
    );
  }

export default Quiz;