import React, { useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import {
    Container,
    TableRow,
    TableCell,
    Button,
    Typography
} from '@material-ui/core';
import { TextCells } from "./TextCells";
import { AdminTable } from "./AdminTable";
import { PageHeader } from "../PageHeader";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


export const AdminAreas = ({ areas, setJobNumbers, auth }) => {
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
        getJobNumbers();
    }, [setJobNumbers]);

    const areaList = areas.map((area, index) => {
        const area_names = areas.map(area => area.name);
        const { area_id } = area;
        return (
            <TableRow key={area_id}>
                <TextCells datas={[area_names[index]]} />
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push(`/admin/areas/${area_id}`)}
                    >確認</ Button>
                </TableCell>
            </TableRow>
        );
    });

    return authenticated ? (
        <Container>
            <PageHeader title="エリア選択画面" />
            <Typography variant="h4" component="h1" gutterBottom>エリア選択画面</Typography>
            <AdminTable dataList={areaList} headList={["エリア", ""]} />
            <Button variant="contained" color="secondary" onClick={() => history.push("/admin/surveys")}>
                設問編集画面へ戻る
            </Button>
        </Container>
    ) : <Redirect to={'/admin'} />;
};