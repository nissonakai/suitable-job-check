import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Questions } from "./components/Questions";
import { Start } from "./components/Start";
import { Result } from "./components/Result";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const Root = () => {
  const [answers, setAnswers] = useState([]);
  const [texts, setTexts] = useState([]);

  const getData = () => {
    axios.get(process.env.REACT_APP_SJC_API)
      .then(results => {
        const data = results.data.data;
        console.log(data);
        setTexts(data);
      }).catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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

