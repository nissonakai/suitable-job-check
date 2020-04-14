import React from 'react';
import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import { TextCells } from "./TextCells";
import axios from 'axios';
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const NumberData = ({
    targetNumbers,
    changeSwitch,
    setChangeSwitch,
    handleChangeNumber,
    num,
    auth
}) => {
    const currentNumIndex = targetNumbers.findIndex(number => number.id === num.id);

            const changeSwitchState = () => {
                const copyChangeSwitch = changeSwitch.slice();
                copyChangeSwitch[currentNumIndex] = !changeSwitch[currentNumIndex];
                setChangeSwitch(copyChangeSwitch);
            };

            const updateNumber = num => {
                const auth_options = {
                    headers: { 'Authorization': `Bearer ${auth.getIdToken()}` }
                };
                if (changeSwitch[currentNumIndex]) {
                    const updateJson = { "number": num.number };
                    axios
                        .patch(`${process.env.REACT_APP_SJC_JOBNUMBERS}/${num.id}`, updateJson, auth_options)
                        .then(res => {
                            if (res.data.status === 'SUCCESS') {
                                console.log(res);
                                alert(`${res.data.data.number}に変更しました。`);
                                changeSwitchState();
                            } else {
                                alert(res.data.data.number);
                            }
                        })
                        .catch(e => {
                            alert(e);
                        });
                } else {
                    changeSwitchState();
                };
            }

            
            return (
                <TableRow key={num.id}>
                    {changeSwitch[currentNumIndex] ? (
                        <>
                            <TableCell>
                                <TextField
                                    name="number"
                                    label="お仕事No"
                                    type="text"
                                    value={num.number}
                                    onChange={e => handleChangeNumber(e, num)}
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
                        >{changeSwitch[currentNumIndex] ? "確定" : "編集"}</ Button>
                    </TableCell>
                </TableRow>
            );
};