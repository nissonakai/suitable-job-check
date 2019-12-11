import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Questions } from "./components/Questions";
import { Start } from "./components/Start";
import { Result } from "./components/Result";

export const Root = () => {
  const [answers, setAnswers] = useState([]);

  const texts = [
    { title: "title1", red: "test1", blue: "test2" },
    { title: "title2", red: "test3", blue: "test4" },
    { title: "title3", red: "test5", blue: "test6" }
  ];

  const resetAnswers = () => setAnswers([]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Start />
        </Route>
        <Route path="/questions/:index" exact>
          <Questions
            texts={texts}
            answers={answers}
            setAnswers={setAnswers}
          />
        </Route>
        <Route path="/result" exact>
          <Result
            answers={answers}
            resetAnswers={resetAnswers}
          />
        </Route>
      </Switch>
    </Router>
  );
};

