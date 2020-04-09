import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Typography,
    Link,
    Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
        marginBottom: "2rem"
    },
    media: {
        height: 200,
        padding: ".4rem"
    },
    jobText: {
        textAlign: "left"
    },
    jobTitle: {
        fontWeight: "bold"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export const JobCard = ({ job, jobIndex, expanded, handleExpandClick }) => {
    const classes = useStyles();
    const points = job.points.map(point => {
        return (
            <Typography variant="body1" gutterBottom key={point}>
                ★{point}
            </Typography>
        );
    });
    return (
        <Card className={classes.root} key={job.title}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={job.image_path}
                    title={`image${jobIndex + 1}`}
                />
            </CardActionArea>
            <CardContent className={classes.jobText}>
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.jobTitle}
                >
                    {job.title}
                </Typography>
                {points}
                <CardActions>
                    <Link
                        variant="body2"
                        onClick={() => handleExpandClick(jobIndex)}
                    >
                        <ExpandMoreIcon
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded[jobIndex],
                            })}
                        />詳しく見る
                    </Link>
                </CardActions>
                <Collapse
                    in={expanded[jobIndex]}
                    unmountOnExit
                    className={classes.jobText}
                >
                    <Typography variant="body2" gutterBottom>
                        【作業内容】{job.content}
                    </Typography>
                    <Typography variant="body2">
                        【勤務場所】{job.location}
                    </Typography>
                    <Typography variant="body2">
                        【勤務時間】{job.shift}
                    </Typography>
                    <Typography variant="body2">
                        【休　　日】{job.holiday}
                    </Typography>
                </Collapse>
            </CardContent>
            <CardActions>
                <Link
                    variant="body2"
                    target="_blank"
                    rel="noopener"
                    href={job.page_link}
                >
                    <Button variant="outlined" color="secondary">
                        応募はこちらから
                        </Button>
                </Link>
            </CardActions>
        </Card>
    )
};