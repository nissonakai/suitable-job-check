import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Container,
    Link,
    Button
} from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    }
}));

export const RecommendJobCards = ({ recommendJobs }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:5000,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive:[
            {
                breakpoint: 768,
                settings:{
                    slidesToShow:1,
                }
            },
        ]
      };
    const classes = useStyles();
    const cards = recommendJobs.map(job => {
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
        )
    })
    return (
        <Container>
            <Typography gutterBottom variant="h5" component="h2">
                あなたにおすすめのお仕事！
            </Typography>
                <Slider {...settings}>
                    {cards}
                </Slider>
        </ Container>
    )
};