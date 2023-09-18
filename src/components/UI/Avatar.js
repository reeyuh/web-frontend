import React from 'react';
import Avatar from '@mui/material/Avatar';

const UserImage = ({ imageSrc, initials, size }) => {
    return (
        <Avatar
            alt={initials}
            src={imageSrc}
            variant="square"
            sx={{
                bgcolor: '#4154f1',
                width: size || 40,
                height: size || 40,
                fontSize: '1em',
                fontWeight: 'bold',
                color: 'white',
            }}
        >
            {initials}
        </Avatar>
    );
};

export default UserImage;
