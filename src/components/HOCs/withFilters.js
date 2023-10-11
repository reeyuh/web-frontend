import React, { useState } from 'react';

const withFilters = (WrappedComponent) => {
    const WithFilter = (props) => {
        const [filters, setFilters] = useState({});

        const formSubmit = (data) => {
            setFilters(data);
        };

        const clearFilters = () => setFilters({});

        const btnList = [
            { text: "Filter" },
        ];

        const extra = {
            btnList,
            clearFilters,
            filters,
            formSubmit,
        };

        return <WrappedComponent {...props} {...extra} />
    }
    return WithFilter;
}

export default withFilters;