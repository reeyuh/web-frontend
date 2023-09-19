"use client";

import React from 'react';
import "@/styles/pageheader.scss";
import { Card, Typography } from '@mui/material';
import PrimaryButton from './primaryButton';

const PageHeader = ({
    onClick,
    text,
    title,
    userImage,
    summary,
    showImage,
}) => {
    return (
        <Card className='details'>
            <div className='title'>
                <div>
                    <Typography color="textPrimary">
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {summary}
                    </Typography>
                </div>
            </div>
            <div className='action'>
                <PrimaryButton
                    text={text}
                    onClick={onClick}
                />
            </div>
        </Card>
    );
};

export { PageHeader };
