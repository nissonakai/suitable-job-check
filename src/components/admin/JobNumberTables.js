import React from 'react';
import { Typography, Container } from "@material-ui/core";
import { AdminTable } from "./AdminTable";
import { NumberData } from "./NumberData";
import axios from 'axios';
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const JobNumberTables = ({
    targetCategories,
    categoryNumbers,
    targetNumbers,
    changeSwitch,
    setChangeSwitch,
    handleChangeNumber,
    auth
}) => {
    const EachTables = targetCategories.map(category => {
        const eachData = categoryNumbers(category.value).map(num => {
            return <NumberData
                    key={num.id}
                    targetNumbers={targetNumbers}
                    changeSwitch={changeSwitch}
                    setChangeSwitch={setChangeSwitch}
                    handleChangeNumber={handleChangeNumber}
                    num={num}
                    auth={auth} />
        });

        return (
            <Container key={category.label}>
                <Typography variant="h5" component="h2" gutterBottom>{category.label}</Typography>
                <AdminTable dataList={eachData} headList={["お仕事No", ""]} />
            </Container>
        )
    });
    return (
        <>
        {EachTables}
        </>
    )
}