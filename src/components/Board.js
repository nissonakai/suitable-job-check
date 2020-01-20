import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        maxWidth: 600,
        margin: "0 auto"
    },
    cardBox: {
        display: "flex"
    },
});

export const Board = ({ texts, doAnswer, index }) => {
    const classes = useStyles();
    const titles = [texts[index].red, texts[index].blue];
    const colors = ["primary", "secondary"];
    const images = [image1, image2];
    const cards = titles.map((title, index) => {
        const answer = { 
            index: index,
            body: title
        };
        return (
            <Card className={classes.card} key={title}>
                    <CardActionArea onClick={() => doAnswer(answer)}>
                        <CardMedia
                            component="img"
                            alt="select1 image"
                            height="150"
                            image={images[index]}
                            title="title1"
                        />
                        <CardContent>
                            <Typography gutterBottom component="p" color={colors[index]}>
                                {title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
        );
    });
    return (
        <div>
            <h1>{texts[index].title}</h1>
            <div className={classes.cardBox}>
                {cards}
            </div>
        </div>

    )
};