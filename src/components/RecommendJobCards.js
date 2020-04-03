import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Container,
    Link,
    Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
        marginBottom: "1rem"
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
    }
}));

export const RecommendJobCards = ({ recommendJobs }) => {
    console.log(recommendJobs);
    const classes = useStyles();
    const cards = recommendJobs.map(job => {
        const points = job.points.map(point => {
            return (
                <Typography variant="body1" gutterBottom key={point}>
                    ★{point}
                </Typography>
            );
        });
        
        const jumpLink = () => {
            window.open(job.page_link, '_blank');
        };

        return (
            <Grid key={job.title} item xs={12} sm={4}>
                <Card className={classes.root}>
                    <CardActionArea
                        onClick={() => jumpLink()}
                    >
                        <CardMedia
                            className={classes.media}
                            image={job.image_path}
                            title={`image${recommendJobs.indexOf(job) + 1}`}
                        />
                        <CardContent className={classes.jobText}>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                className={classes.jobTitle}
                            >
                                {job.title}
                            </Typography>
                            {points}
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
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link
                            variant="body2"
                            target="_blank"
                            rel="noopener"
                            href={job.page_link}
                        >
                            <Button variant="outlined" color="secondary">
                                詳細を見る
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        )
    })
    return (
        <Container>
            <Typography gutterBottom variant="h5" component="h2">
                あなたにおすすめのお仕事！
            </Typography>
            <Grid container justify="center">
                {cards}
            </Grid>
        </ Container>
    )
};