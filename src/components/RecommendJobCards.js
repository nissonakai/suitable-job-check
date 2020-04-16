import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { JobCard } from './JobCard';

export const RecommendJobCards = ({ recommendJobs, userAreaName }) => {
    const expandedArray = Array(recommendJobs.length).fill(false);
    const [expanded, setExpanded] = useState(expandedArray);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        centerMode: true,
        centerPadding: '20px',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    const handleExpandClick = index => {
        const changedExpanded = expanded.slice();
        changedExpanded[index] = !expanded[index];
        setExpanded(changedExpanded);
    };

    const cards = recommendJobs.map((job, jobIndex) => {
        return <JobCard
                job={job}
                jobIndex={jobIndex}
                expanded={expanded}
                handleExpandClick={handleExpandClick}
                key={jobIndex}
                />
    });

    return (
        <>
            <Typography gutterBottom variant="h5" component="h2">
                {`${userAreaName}のあなたにおすすめのお仕事！`}
            </Typography>
            <Slider {...settings}>
                {cards}
            </Slider>
        </>
    )
};