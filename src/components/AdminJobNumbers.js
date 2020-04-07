import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Typography, TableRow, TableCell, TextField, Button, Container } from "@material-ui/core";
import { AdminTable } from "./AdminTable";
import { TextCells } from "./TextCells";
import axios from 'axios';

export const AdminJobNumbers = ({ jobNumbers, setJobNumbers, checkJobNumbers, areas, categories, auth }) => {
    const { area_id } = useParams();
    const area_name = areas.find(area => area.area_id === parseInt(area_id, 10)).name;
    const history = useHistory();
    const authenticated = auth.isAuthenticated();

    useEffect(() => {
        checkJobNumbers(jobNumbers);
    }, []);

    const targetNumbers = jobNumbers.filter(num => num.area_id === parseInt(area_id, 10));

    const switchArray = Array(targetNumbers.length).fill(false);
    const [changeSwitch, setChangeSwitch] = useState(switchArray);

    const targetCategories = categories.filter(category => category.value !== 5);
    const categoryNumbers = category => targetNumbers.filter(num => num.category === category);

    const EachTables = targetCategories.map(category => {
        const eachData = categoryNumbers(category.value).map((num, index) => {

            const changeSwitchState = () => {
                const copyChangeSwitch = changeSwitch.slice();
                copyChangeSwitch[index] = !changeSwitch[index];
                setChangeSwitch(copyChangeSwitch);
            };

            const updateNumber = num => {
                if (changeSwitch[index]) {
                    const updateJson = { "number": num.number };
                    axios
                        .patch(`${process.env.REACT_APP_SJC_JOBNUMBERS}/${num.id}`, updateJson)
                        .then(res => {
                            if (res.data.status === 'SUCCESS') {
                                alert(`${res.data.data.number}に変更しました。`);
                                changeSwitchState();
                            } else {
                                console.log(res.data);
                                alert(res.data.data.number);
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    changeSwitchState();
                };
            }

            const numbersCopy = jobNumbers.slice();
            const handleChangeNumber = e => {
                numbersCopy.find(number => number.id === num.id).number = e.target.value;
                setJobNumbers(numbersCopy);
            };
            return (
                <TableRow key={num.id}>
                    {changeSwitch[index] ? (
                        <>
                            <TableCell>
                                <TextField
                                    name="number"
                                    label="お仕事No"
                                    type="text"
                                    value={num.number}
                                    onChange={e => handleChangeNumber(e)}
                                />
                            </TableCell>
                        </>
                    ) : (
                            <TextCells datas={[num.number]} />
                        )}
                    <TableCell>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => updateNumber(num)}
                        >{changeSwitch[index] ? "確定" : "編集"}</ Button>
                    </TableCell>
                </TableRow>
            );
        });

        return (
            <>
                <Typography variant="h5" component="h2" gutterBottom>{category.label}</Typography>
                <AdminTable dataList={eachData} headList={["お仕事No", ""]} />
            </>
        )
    })

    return authenticated ? (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>{area_name}</Typography>
            {EachTables}
            <Button variant="contained" color="secondary" onClick={() => history.push("/admin/areas")}>
                エリア選択へ戻る
            </Button>
        </Container>
    ): <Redirect to={'/admin'} />;
};