import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Card } from '@mui/material';
import { PrimaryButton } from './primaryButton';
import "@/styles/filters.scss";

const FilterComponent = ({ columns, onFilterSubmit }) => {
    const [filterValues, setFilterValues] = useState({});

    const handleFilterChange = (key, value) => {
        setFilterValues(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const renderFilterInput = (column) => {
        const { key, label, filterType, options } = column;

        switch (filterType) {
            case 'datePicker':
                return <TextField type="date" label={label} value={filterValues[key] || ''} onChange={(e) => handleFilterChange(key, e.target.value)} />;
            case 'select':
                return (
                    <FormControl fullWidth>
                        <InputLabel>{label}</InputLabel>
                        <Select value={filterValues[key] || ''} onChange={(e) => handleFilterChange(key, e.target.value)}>
                            <MenuItem value="">Select</MenuItem>
                            {options.map((option, index) => (
                                <MenuItem key={`option_${index}`} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            case 'text':
                return <TextField label={label} value={filterValues[key] || ''} onChange={(e) => handleFilterChange(key, e.target.value)} />;
            case 'number':
                return <TextField type="number" label={label} value={filterValues[key] || ''} onChange={(e) => handleFilterChange(key, e.target.value)} />;
            default:
                return undefined;
        }
    };

    return (
        <Card className="filters">
            <div className="filters-item">
                <TextField label="Search" variant="outlined" fullWidth />
            </div>
            {columns.filter(column => column.filterType).map((column, index) => (
                <div key={`filters_${index}`} className="filters-item">
                    {renderFilterInput(column)}
                </div>
            ))}
            <div className="filters-item">
                <PrimaryButton text="Filter" onClick={() => onFilterSubmit(filterValues)} />
            </div>
        </Card>
    );
};

export default FilterComponent;
