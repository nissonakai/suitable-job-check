import React from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { PageHeader } from "./PageHeader";


export const NotFound = () => {
    const history = useHistory();

    setTimeout(() => {
        history.push("/");
    }, 5000);

    return (
        <>
            <PageHeader title={"404"} />
            <Typography variant="h5" component="h2">
                ページが存在しません。
            </Typography>
            <Typography variant="caption">
                5秒後にトップページにリダイレクトします。
            </Typography>
        </>
    );
};