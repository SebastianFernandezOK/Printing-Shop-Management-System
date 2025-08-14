import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRecordContext } from 'react-admin';

interface BooleanPrettyFieldProps {
    source: string;
    label?: string;
}

const BooleanPrettyField: React.FC<BooleanPrettyFieldProps> = ({ source }) => {
    const record = useRecordContext();
    const value = record ? record[source] : undefined;
    const isTrue = value === true;
    const isFalse = value === false;
    const isNull = value === null || value === undefined;

    if (isTrue) {
        return <CheckCircleIcon sx={{ color: '#388e3c', verticalAlign: 'middle' }} />;
    } else if (isFalse) {
        return <CancelIcon sx={{ color: '#d32f2f', verticalAlign: 'middle' }} />;
    } else if (isNull) {
        return <CancelIcon sx={{ color: '#bdbdbd', verticalAlign: 'middle' }} />;
    }
    return null;
};

export default BooleanPrettyField;
