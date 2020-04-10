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

export const AdminAreas = ({ areas, getJobNumbers, auth }) => {
    const history = useHistory();
    const authenticated = auth.isAuthenticated();

    useEffect(() => {
        getJobNumbers();
    }, []);

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
            <Typography variant="h4" component="h1" gutterBottom>エリア選択画面</Typography>
            <AdminTable dataList={areaList} headList={["エリア", ""]} />
            <Button variant="contained" color="secondary" onClick={() => history.push("/admin/surveys")}>
                設問編集画面へ戻る
            </Button>
        </Container>
    ) : <Redirect to={'/admin'} />;
};