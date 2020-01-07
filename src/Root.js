import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Questions } from "./components/Questions";
import { Start } from "./components/Start";
import { Result } from "./components/Result";
import { Edit } from "./components/Edit";
import { Index } from "./components/Index";
import { Admin } from "./components/Admin";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const Root = () => {
  const [answers, setAnswers] = useState([]);
  const [texts, setTexts] = useState([]);

  const getData = () => {
    axios.get(process.env.REACT_APP_SJC_API)
      .then(results => {
        const data = results.data.data;
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
        <Route path="/admin/edit/:index" exact>
          <Edit
            texts={texts}
          />
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
        <Route path="/admin/questions" exact>
          <Index
            texts={texts}
            setTexts={setTexts}
          />
        </Route>
      </Switch>
    </Router>
  );
};

