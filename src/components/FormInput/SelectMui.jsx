import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
export default function SelectMui({ handleChange, placeholder, data = [], control, name, errors = '' }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <FormControl>
                        <Select
                            displayEmpty
                            sx={{
                                fontSize: 16,
                            }}
                            error={!!errors}
                            renderValue={
                                field.value !== ''
                                    ? undefined
                                    : () => <div style={{ color: '#a2a2a2', fontSize: 16 }}>{placeholder}</div>
                            }
                            onChange={(e) => {
                                handleChange(e);
                                field.onChange(e);
                            }}
                            value={field.value}
                        >
                            {data.length === 0 && (
                                <MenuItem value="">
                                    <em>Không có dữ liệu</em>
                                </MenuItem>
                            )}
                            {data.map((option) => (
                                <MenuItem key={option.Id} value={option.Id}>
                                    {option.Name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText
                            sx={{
                                margin: '3px 14px 0 14px',
                            }}
                        >
                            {errors}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
}
