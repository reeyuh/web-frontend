"use client";

import React from 'react';
import TabbedContent from '@/components/UI/tabs';

import UsersList from '@/components/users';
import CreateUsers from './create/page';

const tabs = [
    { label: 'Users', link: '/users' },
    { label: 'Create User', link: '/users/create' },
];

const UsersLayout = ({ children }) => {
    const defaultTab = tabs.find((tab) => tab.link === window.location.pathname);

    return (
        <div>
            <TabbedContent tabs={tabs} defaultTab={defaultTab}>
                {children}
            </TabbedContent>
        </div>
    );
};

export default UsersLayout;
