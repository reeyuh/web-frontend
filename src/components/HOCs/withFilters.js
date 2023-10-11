import React, { useState } from 'react';

const withFilters = (WrappedComponent) => {
    const WithFilter = (props) => {
        const [filters, setFilters] = useState({});
        const [page, setPage] = useState(1);

        const formSubmit = (data) => {
            setPage(1);
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
            page,
            setPage,
        };

        return <WrappedComponent {...props} {...extra} />
    }
    return WithFilter;
}

export default withFilters;