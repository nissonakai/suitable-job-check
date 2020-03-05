import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Auth from './Auth';
import Callback from "./callback/Callback";
import { Questions } from "./components/Questions";
import { Start } from "./components/Start";
import { Result } from "./components/Result";
import { AdminQuestions } from "./components/AdminQuestions";
import { AdminSurveys } from "./components/AdminSurveys";
import { Admin } from "./components/Admin";
import { UserForm } from "./components/UserForm";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const auth = new Auth();

export const Root = () => {
  const [answers, setAnswers] = useState([]);
  const [texts, setTexts] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [surveyId, setSurveyId] = useState(false);

  const getSurveys = () => {
    axios.get(process.env.REACT_APP_SJC_SURVEYS)
      .then(results => {
        const datas = results.data.data;
        setSurveys(datas);
        const targetSurveys = datas.filter(data => {
          return data.selected === true;
        });
        setSurveyId(targetSurveys[0].id);
      }).catch(error => {
        console.log(error);
      })
  };

  const getQuestions = () => {
    axios.get(process.env.REACT_APP_SJC_QUESTIONS)
      .then(results => {
        const datas = results.data.data;
        setTexts(datas);
      }).catch(error => {
        console.log(error);
      });
  };


  useEffect(() => {
    getSurveys();
    getQuestions();
  }, [setTexts, setSurveys]);

  const targetDatas = texts.filter(text => {
    return text.survey_id === surveyId;
  });

  const resetAnswers = () => setAnswers([]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Start 
            getQuestions={getQuestions}
            getSurveys={getSurveys}
          />
        </Route>
        <Route path="/callback" render={() => (
          <Callback auth={auth} />
        )}/>
        <Route path="/questions/:index" exact>
          <Questions
            texts={targetDatas}
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
        <Route path="/admin" exact>
          <Admin
            auth={auth}
          />
        </Route>
        <Route path="/admin/questions/:questionIndex" exact>
          <AdminQuestions
            texts={texts}
            getQuestions={getQuestions}
            surveys={surveys}
            auth={auth}
          />
        </Route>
        <Route path="/admin/surveys" exact>
          <AdminSurveys
            surveys={surveys}
            setSurveys={setSurveys}
            auth={auth}
          />
        </Route>
        <Route path="/form" exact>
          <UserForm
          />
        </Route>
      </Switch>
    </Router>
  );
};
