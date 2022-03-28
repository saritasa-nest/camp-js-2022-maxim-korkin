import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import { VFC } from 'react';

interface SelectProps{
  /** Options for select input. */
  readonly options: readonly string[];

  /** Label. */
  readonly label: string;
}

type Props = FieldHookConfig<string> & SelectProps;

export const FormikSelect: VFC<Props> = ({ options, label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={field.value}
        label={label}
        onChange={field.onChange}
        name={field.name}
      >
        {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  );
};
