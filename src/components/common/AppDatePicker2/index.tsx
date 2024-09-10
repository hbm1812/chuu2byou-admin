// @ts-nocheck
import React from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

const AppDatePicker2 = ({value, handleGetValue}) => {
    const handleChange = (date) => {
        handleGetValue(date ? date.format('YYYY-MM-DD') : null);
    };

    const Style = {
        width: "100%",
        border: "1px solid ",
        padding: '4.5px 10px',
        borderRadius: '0%'
    };

    return (
        <DatePicker
            value={value ? moment(value, 'YYYY-MM-DD') : null}
            onChange={handleChange}
            format="DD/MM/YYYY"
            style={Style}
        />
    );
};

export default AppDatePicker2;
