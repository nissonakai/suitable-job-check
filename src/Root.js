import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Auth } from './Auth';
import Callback from "./callback/Callback";
import { Questions } from "./components/Questions";
import { Start } from "./components/Start";
import { Result } from "./components/Result";
import { AdminQuestions } from "./components/admin/AdminQuestions";
import { AdminSurveys } from "./components/admin/AdminSurveys";
import { AdminAreas } from "./components/admin/AdminAreas";
import { AdminJobNumbers } from "./components/admin/AdminJobNumbers";
import { Admin } from "./components/admin/Admin";
import { UserForm } from "./components/UserForm";
import axios from "axios";
import { theme } from "./assets/theme";
import Consts from "./Consts";

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const auth = new Auth();
const auth_options = {
  headers: { 'Authorization': `Bearer ${auth.getIdToken()}` }
};

export const Root = () => {

  const { categories, areas } = Consts;

  const [answers, setAnswers] = useState([]);
  const [texts, setTexts] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [surveyId, setSurveyId] = useState(false);
  const [jobNumbers, setJobNumbers] = useState([]);
  const [recommendJobs, setRecommendJobs] = useState([]);
  const [userAreaName, setUserAreaName] = useState("");

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
  const resetRecommendJobs = () => setRecommendJobs([]);

  const computedCategory = num => {
    const targetCategory = categories.find(category => {
      return category.value === num;
    });
    return targetCategory.label;
  };

  const computedData = num => {
    const obj = {};
    if (answers.length === 0) {
      return false;
    };
    const targetBase = answers.filter(answer => answer.category === num);

    const targetBaseValue = targetBase.length * 100;

    const targetValue =
      targetBase
        .map(answer => answer.value)
        .reduce((accm, current) => {
          return parseInt(accm, 10) + parseInt(current, 10);
        });
    obj.id = num;
    obj.key = computedCategory(num);
    obj.value = Math.floor(parseInt(targetValue, 10) / targetBaseValue * 100);
    obj.fullMark = 100;
    return obj;
  };

  const calcResult = () => {
    const computedResult =
      categories
        .filter(category => {
          return category.value !== 5;
        })
        .map(category => {
          return computedData(category.value);
        });

    const topScore =
      computedResult
        .map(data => data.value)
        .reduce((accum, current) => current >= accum ? current : accum);

    const topScoreTitles =
      computedResult
        .filter(data => data.value === topScore);

    const resultTitle = topScoreTitles.length === 4
      ? "バランス"
      : topScoreTitles
        .map(data => data.key)
        .reduce((accum, current) => `${accum}・${current}`);

    const resultIds = topScoreTitles.map(data => data.id);
    return [computedResult, resultTitle, resultIds];
  };

  return (
    <MuiThemeProvider theme={theme} >
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Start
                getQuestions={getQuestions}
                getSurveys={getSurveys}
              />
            </Route>
            <Route
              path="/callback"
              exact
              render={props => (
                <Callback {...props} auth={auth} />
              )} />
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
                resetRecommendJobs={resetRecommendJobs}
                calcResult={calcResult}
                recommendJobs={recommendJobs}
                userAreaName={userAreaName}
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
                surveys={surveys}
                categories={categories}
                computedCategory={computedCategory}
                auth={auth}
                auth_options={auth_options}
              />
            </Route>
            <Route path="/admin/surveys" exact>
              <AdminSurveys
                surveys={surveys}
                setSurveys={setSurveys}
                auth={auth}
                auth_options={auth_options}
              />
            </Route>
            <Route path="/admin/areas" exact>
              <AdminAreas
                areas={areas}
                auth={auth}
                setJobNumbers={setJobNumbers}
              />
            </Route>
            <Route path="/admin/areas/:area_number" exact>
              <AdminJobNumbers
                jobNumbers={jobNumbers}
                setJobNumbers={setJobNumbers}
                areas={areas}
                categories={categories}
                auth={auth}
                auth_options={auth_options}
              />
            </Route>
            <Route path="/form" exact>
              <UserForm
                answers={answers}
                computedData={computedData}
                categories={categories}
                calcResult={calcResult}
                setRecommendJobs={setRecommendJobs}
                auth={auth}
                setUserAreaName={setUserAreaName}
              />
            </Route>
          </Switch>
        </Router>
      </Container>
    </MuiThemeProvider>
  );
};
