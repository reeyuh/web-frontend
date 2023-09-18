"use client";

import React from 'react';
import "@/styles/pageheader.scss";
import { Card, Typography } from '@mui/material';
import PrimaryButton from './primaryButton';
import Avatar from './UI/Avatar';
import { getInitials } from '@/shared';

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
                {showImage && <div className='user-image'>
                    <Avatar
                        initials={getInitials(title)}
                        imageSrc={userImage}
                    />
                </div>}
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

PageHeader.defaultProps = {
    text: 'Add User',
    title: 'All Clients',
    summary: 'All client info, status, and actions to edit, delete a client',
    showImage: true,
}

export { PageHeader };
