import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
    mt: {
        marginTop: "2em"
    }
  });

export const SurveySwitch = ({selected, setSelected}) => {
    
    const { questionIndex } = useParams();
    const classes = useStyles();

    const updateSelected = () => {
        const confirmWindow = window.confirm(`変更してもよろしいですか？`);
        if (confirmWindow) {
            axios
            .patch(`${process.env.REACT_APP_SJC_SURVEYS}/${questionIndex}/selected`, {"selected": true})
            .then(res => {
                console.log(res.data);
                setSelected(true);
                alert(`更新しました。`);
            })
            .catch(err => {
                alert("更新に失敗しました。");
            });
        };
    };


  return (
    <div className={classes.mt}>
        {selected ? (
            <p>適用中</p>
        ):(
            <Button
                variant="contained"
                color="primary"
                onClick={() => updateSelected()}
            >適用する</ Button>
        )}
    </div>
  );
}