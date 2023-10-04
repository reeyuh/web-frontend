import React, { useState } from 'react';

const withFilters = (WrappedComponent) => {
    const WithFilter = (props) => {
        const [filters, setFilters] = useState({});
        const [page, setPage] = useState(1);

        const handleFilter = (key, e) => {
            const newFilters = Object.assign({}, filters);

            const applyFilters = (key, e) => {
                const value = e && e.target ? e.target.value : e;
                newFilters[key] = value;
            }

            if (typeof key === 'object') {
                for (const k in key) {
                    applyFilters(k, key[k]);
                }
            } else {
                applyFilters(key, e);
            }

            setFilters(newFilters);
            setPage(1);
        }

        const clearFilters = () => setFilters({});

        const extra = {
            handleFilter,
            filters,
            setPage, // can be used to control the currentPage prop for Table component
        };

        return <WrappedComponent {...props} {...extra} />
    }
    return WithFilter;
}

export default withFilters;