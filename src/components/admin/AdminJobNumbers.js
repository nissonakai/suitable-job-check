import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Typography, Button, Container } from "@material-ui/core";
import axios from 'axios';
import { JobNumberTables } from './JobNumberTables';
import { PageHeader } from "../PageHeader";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const AdminJobNumbers = ({ jobNumbers, setJobNumbers, areas, categories, auth }) => {
    const { area_number } = useParams();
    const area_name = areas.find(area => area.area_id === parseInt(area_number, 10)).name;
    const history = useHistory();
    const authenticated = auth.isAuthenticated();

    useEffect(() => {
        const getJobNumbers = () => {
            axios.get(process.env.REACT_APP_SJC_JOBNUMBERS)
              .then(results => {
                const datas = results.data.data;
                setJobNumbers(datas);
              }).catch(error => {
                console.log(error);
              });
          };
        
          const checkJobNumbers = numbers => {
            if (numbers.length === 0) {
              getJobNumbers();
            };
          };

        checkJobNumbers(jobNumbers);
    }, [jobNumbers, setJobNumbers]);

    const targetNumbers = jobNumbers.filter(num => num.area_id === parseInt(area_number, 10));

    const switchArray = Array(targetNumbers.length).fill(false);
    const [changeSwitch, setChangeSwitch] = useState(switchArray);
    const targetCategories = categories.filter(category => category.value !== 5);
    const categoryNumbers = category => targetNumbers.filter(num => num.category === category);

    const handleChangeNumber = (e, num) => {
        const numbersCopy = jobNumbers.slice();
        numbersCopy.find(number => number.id === num.id).number = e.target.value;
        setJobNumbers(numbersCopy);
    };

    return authenticated ? (
        <Container>
            <PageHeader title={`${area_name}お仕事No.編集画面`} />
            <Typography variant="h4" component="h1" gutterBottom>{area_name}</Typography>
            <JobNumberTables
                targetCategories={targetCategories}
                categoryNumbers={categoryNumbers}
                targetNumbers={targetNumbers}
                changeSwitch={changeSwitch}
                setChangeSwitch={setChangeSwitch}
                handleChangeNumber={handleChangeNumber}
                auth={auth}
            />
            <Button variant="contained" color="secondary" onClick={() => history.push("/admin/areas")}>
                エリア選択へ戻る
            </Button>
        </Container>
    ): <Redirect to={'/admin'} />;
};