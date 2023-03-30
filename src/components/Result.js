import React from 'react';
import Results from '../api/Results'

const Result = (props) => {

    console.log("The result is " + props.quizResult);

    let result = props.quizResult;
    let houses = Results.map(item => item.house);
    let index;
    if (houses[0] === result){index=0}
    if (houses[1] === result){index=1}
    if (houses[2] === result){index=2}

    return (
        <div className={`result ${props.quizResult}`}>
            <div className="App-section">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="results-container p-5">
                            <h2>{props.quizResult}</h2>

                            <p className="result-text">
                            <strong>{Results[index].tagline}</strong> {Results[index].motto}
                            </p>
                            <div className="result-btns">
                                <p><a href={Results[index].website} target="_blank"><button role="button" className="btn btn-lg btn-primary">Learn More</button></a></p>
                                <p><a href="/take-the-quiz"><button role="button" className="btn btn-lg btn-primary">Start Over</button></a></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Result;