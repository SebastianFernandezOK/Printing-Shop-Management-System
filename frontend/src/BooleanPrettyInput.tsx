import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useInput, useRecordContext } from 'react-admin';

interface BooleanPrettyInputProps {
    source: string;
    label?: string;
    disabled?: boolean;
}

const BooleanPrettyInput: React.FC<BooleanPrettyInputProps> = ({ source, label, disabled, ...rest }) => {
    const {
        field: { value, onChange },
        fieldState,
        isRequired,
    } = useInput({ source, ...rest });
    const record = useRecordContext();

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={!!value}
                    onChange={e => onChange(e.target.checked)}
                    color={value ? 'success' : 'error'}
                    disabled={disabled}
                />
            }
            label={label}
        />
    );
};

export default BooleanPrettyInput;
